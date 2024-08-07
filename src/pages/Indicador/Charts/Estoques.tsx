import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'
import { formatoMoneyBR } from 'utils';
import styles from './Charts.module.scss'

interface Props {
    name: string
    data: any
}

export default function Estoques(props: Props) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fields = ['Average 2022', 'Average 2023', 'Average 2024', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const data = [null, null, null, ...props.data.data];
        const averages = [...props.data.averages, null, null, null, null, null, null, null, null, null, null, null, null]
        let last = [null, null, null, ...props.data.last];
        let target = [null, null, ...props.data.target];

        var config = {
            series: [
                {
                    name: 'Current Year',
                    type: 'column',
                    data: data,
                },
                {
                    name: 'Last Year',
                    type: 'area',
                    data: last,
                    color: '#807f7f'
                },
                {
                    name: 'Average',
                    type: 'column',
                    data: averages,
                    color: '#548235',
                },
                {
                    name: 'Target',
                    type: 'line',
                    data: target,
                    color: '#FF0000'
                },
            ],
            chart: {
                height: 500,
                type: 'line',
                stacked: false,
            },
            stroke: {
                width: [2, 2, 2, 2],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: '60%'
                }
            },
            fill: {
                opacity: [0.85, 0.25, 0.85, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                }
            },
            labels: fields,
            markers: {
                size: 0
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0, 2],
                formatter: function (val: any) { // <<< Adicione o formatter aqui
                    if (val > 0) {
                        if (!props.name.includes('Turns')) {
                            return formatoMoneyBR.format(val);
                        } else {
                            return val.toFixed(1)
                        }
                    }
                }
            },
            yaxis: {
                min: 0,
                labels: { // <<< Adicione esta seção para formatar os labels do eixo Y
                    formatter: function (val: any) {
                        if (val > 0) {
                            if (!props.name.includes('Turns')) {
                                return formatoMoneyBR.format(val);
                            } else {
                                return val.toFixed(1)
                            }
                        }
                    }
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y: any) {
                        if (typeof y !== "undefined" && y !== null) {
                            if (!props.name.includes('Turns')) {
                                return formatoMoneyBR.format(y.toFixed(0));
                            } else {
                                return y.toFixed(2)
                            }
                        }
                        return y;

                    }
                }
            }
        };

        var chart = new ApexCharts(chartRef.current!, config);
        chart.render();

        return () => {
            chart.destroy(); // Limpa o gráfico quando o componente for desmontado
        };
    }, [props.data, props.name]); // Renderiza novamente se os dados mudarem

    return (
        <>
            <div className={styles.meta}>Target: <div style={{ color: '#FF0000' }}>{props.name.includes('Turns') ? props.data.target[12].toFixed(1) : formatoMoneyBR.format(props.data.target[12])}</div></div>
            <div id="chart" ref={chartRef} />
        </>
    )
};