import { Table, Space, Progress } from "antd";
import { useEffect, useState } from "react";

interface Props {
    database: any[];
    indicadores: string[];
    empresas: string[];
    selecionarIndicador: any;
    country?: string;
}

interface DataItem {
    [key: string]: string | number | undefined;
}

export default function Tabela(props: Props) {
    const [database, setDatabase] = useState(
        props.database.filter(
            (value: any) =>
                value.company !== null &&
                (value.country === props.country || props.country === 'Global')
        )
    );
    useEffect(() => {
        setDatabase(
            props.database.filter(
                (value: any) =>
                    value.company !== null &&
                    (value.country === props.country || props.country === 'Global')
            )
        );
    }, [props.country, props.database]);

    // Função para verificar se a coluna possui algum valor
    const hasValueInColumn = (empresa: string) => {
        return database.some((item) => item.company === empresa && item.result !== null);
    };

    const columns = [
        {
            title: "INDICATOR",
            dataIndex: "indicador",
            key: "indicador",
        },
        // Filtra as empresas para exibir apenas as que possuem valores
        ...props.empresas
            .filter((empresa) => hasValueInColumn(empresa))
            .map((empresa: string) => ({
                title: empresa,
                dataIndex: empresa,
                key: empresa,
                render: (text: string, record: any) => {
                    const indicador = record.indicador;
                    const indicadorAtual = database.find(
                        (item) => item.indicator === indicador && empresa === item.company);
                    const outputValue = indicadorAtual ? (indicador !== 'On time Delivery' && indicador !== 'Efficiency'
                        ? (Number(text) === 0 ? 100 : Number(text))
                        : Number((indicadorAtual.average * 100).toFixed(2))) : 0

                    let color = '#52c41a'
                    if (outputValue < 100) color = '#1677ff'
                    if (outputValue < 80) color = '#e3ac14'
                    if (outputValue < 60) color = '#ff4d4f'

                    let contentText: any;
                    if (indicadorAtual) {
                        if (indicador === "On time Delivery") {
                            contentText = <>{(indicadorAtual.average * 100).toFixed(2)}%<br />
                                {indicadorAtual.target ? (indicadorAtual.target * 100).toFixed(2) + '%' : '-'}</>

                        } else if (indicador === "Inventory Turns") {
                            contentText = <>{(indicadorAtual.average).toFixed(1)}<br /> {(indicadorAtual.target).toFixed(1)}</>

                        } else if (indicador.includes("Inventory*")) {
                            color = '#52c41a'
                            if (outputValue >= 60) color = '#1677ff'
                            if (outputValue >= 80) color = '#e3ac14'
                            if (outputValue >= 100) color = '#ff4d4f'
                            contentText = <>{(indicadorAtual.average / 1000).toFixed(2)}k<br />
                                {indicadorAtual.target ? (indicadorAtual.target / 1000).toFixed(2) + 'k' : '-'}</>

                        } else if (indicador.includes('Efficiency')) {
                            contentText = <>{(indicadorAtual.average * 100).toFixed(2)}%</>

                        } else {
                            contentText = <>{indicadorAtual.average}</>
                        }
                    }

                    return (
                        <div
                            onClick={() => {
                                if (indicadorAtual) {
                                    props.country ? props.selecionarIndicador(indicadorAtual.title, indicadorAtual.country)
                                        : props.selecionarIndicador(indicadorAtual.title)
                                }
                            }}
                        >
                            <Space
                                direction="vertical"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {text && <Progress type="circle" format={() => contentText}
                                    status="active" percent={outputValue} strokeColor={color} />}
                            </Space>
                        </div>
                    );
                },
            })),
    ];

    const data: DataItem[] = props.indicadores.map((indicadorName, index) => {
        const empresaValues: any = {};
        props.empresas.forEach((empresa) => {
            const rowData = database.find(
                (item) => item.indicator === indicadorName && empresa === item.company
            );
            empresaValues[empresa] = rowData
                ? (rowData.result * 100).toFixed(2)
                : undefined;
        });
        return {
            key: index,
            indicador: indicadorName,
            ...empresaValues,
        };
    });

    return <Table scroll={{ x: 750 }} columns={columns} dataSource={data} bordered />;
}