import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'
import styles from './Charts.module.scss'

interface Props {
    name: string
    data: any
}

export default function OVs(props: Props) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fields = ['Average 2022', 'Average 2023', 'Average 2024', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const data = [null, null, null, ...props.data.data];
        const averages = [...props.data.averages, null, null, null, null, null, null, null, null, null, null, null, null]
        const target = Array.from({ length: 15 }, (_, index) =>
            index >= 2 ? props.data.Meta : null
        );

        var config = {
            series: [
                {
                    name: 'Current Year',
                    type: 'column',
                    data: data,
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
                width: [2, 2, 2],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: '60%'
                }
            },
            fill: {
                opacity: [0.85, 0.85, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100]
                }
            },
            labels: fields,
            markers: {
                size: 0
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0, 1],
                formatter: function (val: any) { // <<< Adicione o formatter aqui
                    if (val > 0) {
                        return (val * 100).toFixed(2) + '%'
                    }
                }
            },
            yaxis: {
                min: 0,
                max: 1,
                labels: { // <<< Adicione esta seção para formatar os labels do eixo Y
                    formatter: function (val: any) {
                        if (val > 0) {
                            return val * 100 + '%'
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
                            return (y * 100).toFixed(2) + '%'
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
            <div className={styles.meta}>Target: <div style={{ color: '#FF0000' }}>{props.data.Meta > 0 ? (props.data.Meta * 100).toFixed(2) + '%' : '0%'}</div></div>
            <div id="chart" ref={chartRef} />
        </>
    )
};