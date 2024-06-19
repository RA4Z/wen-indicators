import { Line } from '@ant-design/plots'
import valores from 'data/valores.json'
import styles from './Indicador.module.scss'

interface Props {
    nome: string
}

export default function LineIndicator(props: Props) {
    const data = valores.filter(valor => valor.indicador === props.nome)[0].dados
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