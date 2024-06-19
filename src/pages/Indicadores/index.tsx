import { Modal } from 'antd'
import Indicators from 'data/indicadores.json'
import styles from './Indicador.module.scss'
import { useEffect, useState } from 'react'

interface Props {
    country: string
    isModalOpen: boolean,
    setIsModalOpen: any
    setIndicador: any,
    setIsIndicadorOpen: any
}

export default function Indicadores(props: Props) {
    const [data, setData] = useState<typeof Indicators[0]>()
    const handleOk = () => {
        props.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    useEffect(() => {
        const value = Indicators.filter(indicator => indicator.id === props.country)
        setData(value[0])
    }, [props.country])

    function selecionarIndicador(nome: string) {
        props.setIsModalOpen(false);
        props.setIndicador(nome)
        props.setIsIndicadorOpen(true)
    }

    return (
        <>
            {data && <Modal title={`Indicadores ${data.country}`}
                className={styles.modal}
                open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[]}>
                {data.indicadores.map((indicador, id) => (
                    <p key={id} onClick={() => selecionarIndicador(indicador)}>{indicador}</p>
                ))}
            </Modal>}
        </>
    )
}