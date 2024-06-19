import { Line } from '@ant-design/plots'
import styles from './Indicador.module.scss'

interface Props {
    data: any
}

export default function LineIndicator(props: Props) {
    const data = props.data.dados
    const config = {
        data,
        xField: 'Mês',
        yField: 'Plan',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };
    return (
        <>
            <Line className={styles.graficos} {...config} />
        </>
    );
};