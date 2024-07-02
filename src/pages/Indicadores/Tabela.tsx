import { Table, Space, Progress, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { formatoMoneyBR } from "utils";

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
                    const outputValue = indicadorAtual ? (indicador !== 'Atendimento das OVs' ? (Number(text) === 0 ? 100 : Number(text))
                        : Number((indicadorAtual.average * 100).toFixed(2))) : 0

                    let color = '#52c41a'
                    if (outputValue < 100) color = '#1677ff'
                    if (outputValue < 80) color = '#e3ac14'
                    if (outputValue < 60) color = '#ff4d4f'

                    let tooltipContent; // Variável para o conteúdo do tooltip
                    if (indicadorAtual) {
                        if (indicador === "Atendimento das OVs") {
                            tooltipContent = (
                                <div>
                                    Atual: {(indicadorAtual.average * 100).toFixed(2)}%<br />
                                    Meta: {(indicadorAtual.target * 100).toFixed(2)}%
                                </div>
                            );
                        } else if (indicador === "Inventory Turns") {
                            tooltipContent = (
                                <div>
                                    Atual: {indicadorAtual.average.toFixed(1)}<br />
                                    Meta: {indicadorAtual.target.toFixed(1)}
                                </div>
                            );
                        } else if (indicador.includes("Inventory")) {
                            tooltipContent = (
                                <div>
                                    Atual: {formatoMoneyBR.format(indicadorAtual.average)}<br />
                                    Meta: {formatoMoneyBR.format(indicadorAtual.target)}
                                </div>
                            );
                        } else {
                            tooltipContent = indicadorAtual.average;
                        }
                    }

                    return (
                        <div
                            onClick={() => {
                                if (indicadorAtual) {
                                    props.country ? props.selecionarIndicador(indicadorAtual.title, indicadorAtual.country) : props.selecionarIndicador(indicadorAtual.title)
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
                                <Tooltip title={tooltipContent} color='blue'>
                                    {text && <Progress type="circle" percent={outputValue} strokeColor={color} />}
                                </Tooltip>
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