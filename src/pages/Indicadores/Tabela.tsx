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
                value.result !== null &&
                value.company !== null &&
                value.country === props.country
        )
    );

    useEffect(() => {
        setDatabase(
            props.database.filter(
                (value: any) =>
                    value.result !== null &&
                    value.company !== null &&
                    value.country === props.country
            )
        );
    }, [props.country, props.database]);

    // Função para verificar se a coluna possui algum valor
    const hasValueInColumn = (empresa: string) => {
        return database.some((item) => item.company === empresa && item.result !== null);
    };

    const columns = [
        {
            title: "Indicador",
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
                        (item) => item.indicator === indicador && empresa === item.company
                    );
                    return (
                        <div
                            onClick={() => {
                                if (indicadorAtual) {
                                    props.selecionarIndicador(indicadorAtual.title);
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
                                {text && <Progress type="circle" percent={Number(text)} />}
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