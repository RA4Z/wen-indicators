import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'
import { formatoMoneyBR } from 'utils';

interface Props {
    data: any
}

export default function Estoques(props: Props) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fields = ['Average 2022', 'Average 2023', 'Average 2024', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const data = [...props.data.averages, ...props.data.data];
        let last = [null, null, null, ...props.data.last];
        let target = [null, null, ...props.data.target];

        // const data = [...props.data.averages, ...props.data.data]
        //     .map((valor: any, indice: any) => ({
        //         x: fields[indice],
        //         y: valor !== null ? valor : 1,
        //         fillColor: indice === 0 ? '#548235' : '#000'
        //     }));

        // 1º e 2º = #548235
        // 3º = #2e75b6

        var config = {
            series: [
                {
                    name: 'Ano Atual',
                    type: 'column',
                    data: data
                },
                {
                    name: 'Ano Anterior',
                    type: 'area',
                    data: last,
                    color: '#807f7f'
                },
                {
                    name: 'Meta',
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
                width: [0, 2, 5],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },
            fill: {
                opacity: [0.85, 0.25, 1],
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
                enabledOnSeries: [0],
                formatter: function (val: any) { // <<< Adicione o formatter aqui
                    if (val > 0) return formatoMoneyBR.format(val);
                }
            },
            yaxis: {
                title: {
                    text: 'Valor Estoque',
                },
                min: 0,
                labels: { // <<< Adicione esta seção para formatar os labels do eixo Y
                    formatter: function (val: any) {
                        return formatoMoneyBR.format(val);
                    }
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y: any) {
                        if (typeof y !== "undefined" && y !== null) {
                            return formatoMoneyBR.format(y.toFixed(0));
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
    }, [props.data]); // Renderiza novamente se os dados mudarem

    return (
        <>
            <div id="chart" ref={chartRef} />
        </>
    )
};