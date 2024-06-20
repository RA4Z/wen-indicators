import { DualAxes } from '@ant-design/plots';
import styles from './Charts.module.scss'

interface Props {
    data: any
}

export default function PlanvsReal(props: Props) {
    console.log(props.data)
    const data = props.data.dados;

    const config = {
        data,
        xField: 'Mês',
        legend: true,
        children: [
            {
                type: 'interval',
                yField: 'Realizado',
                style: { maxWidth: 80, fill: '#1447b5' },
                label: { position: 'inside', fill: 'white' },
                scale: { series: { domainMin: 0, independent: true } },
                interaction: {
                    elementHighlight: true,
                    elementHighlightByColor: { background: true },
                },
            },
            {
                type: 'line',
                yField: 'Planejado',
                shapeField: 'smooth',
                style: { maxWidth: 80, lineWidth: 5 },
                label: { position: 'inside', fill: 'black' },
                axis: { y: false },
                scale: { y: { domainMin: 0, independent: true } },
                interaction: {
                    tooltip: {
                        crosshairs: false,
                        marker: false,
                    },
                },
            },
        ],
    }

    return (
        <>
            <DualAxes className={styles.chart} {...config} />
        </>
    );
};