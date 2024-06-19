import { DualAxes } from '@ant-design/plots';
import styles from './Indicador.module.scss'

interface Props {
    data: any
}

export default function LineIndicator(props: Props) {
    const data = props.data.dados;

    const config = {
        data,
        xField: 'Mês',
        legend: true,
        children: [
            {
                type: 'interval',
                yField: 'Realizado',
                style: { maxWidth: 80, fill:'#1447b5' },
                label: { position: 'inside', fill:'white' },
                interaction: {
                    elementHighlight: true,
                    elementHighlightByColor: { background: true },
                },
            },
            {
                type: 'line',
                yField: 'Planejado',
                shapeField: 'smooth',
                style: { lineWidth: 5 },
                axis: { y: false },
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
            <DualAxes className={styles.graficos} {...config} />
        </>
    );
};