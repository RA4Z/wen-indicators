import { Modal } from 'antd'
import styles from './Indicador.module.scss'
import { useEffect, useState } from 'react'

interface Props {
    country: string
    isModalOpen: boolean,
    indicators: any
    setIsModalOpen: any
    setIndicador: any,
    setIsIndicadorOpen: any,
    filtros: any,
    filiais: any
}

export default function Indicadores(props: Props) {
    const [data, setData] = useState<any>()

    const handleOk = () => {
        props.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    useEffect(() => {
        const value = props.indicators.filter((indicator: any) => indicator.id === props.country)
        if (value.length > 0) {
            const filtrados = props.filtros.filter((filtro: any) => filtro.selecionado === true)
            const filiais = props.filiais.filter((filial: any) => filial.selecionado === true)

            const filter: string[] = filtrados.map((filtro: any) => filtro.nome);
            const filial: string[] = filiais.map((filial: any) => filial.nome);
            
            const selected_filial = value.filter((indicador:any) => filial.includes(indicador.empresa))
            const nomes = selected_filial.reduce((acc: string[], item: any) => {
                const indicadoresFiltrados = item.indicadores.filter((indicador: string) =>
                    filter.some(nomeFiltro => indicador.includes(nomeFiltro))
                );
                return [...acc, ...indicadoresFiltrados];
            }, []);

            const newValue = { ...value[0], indicadores: nomes };
            setData(newValue)
        } else {
            setData(value[0])
        }
    }, [props.filtros, props.country, props.indicators, props.filiais])

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
                {data.indicadores.map((indicador: any, id: any) => (
                    <p key={id} onClick={() => selecionarIndicador(indicador)}>{indicador}</p>
                ))}
            </Modal>}
        </>
    )
}