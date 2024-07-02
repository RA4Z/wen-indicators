import { Modal } from 'antd'
import styles from './Indicador.module.scss'
import { useEffect, useState } from 'react'
import Tabela from './Tabela'

import Alemanha from 'images/bandeira alemanha.png'
import Africa from 'images/bandeira africa.png'
import Brasil from 'images/bandeira brasil.png'
import China from 'images/bandeira china.png'
import India from 'images/bandeira india.png'
import Portugal from 'images/bandeira portugal.png'
import USA from 'images/bandeira usa.png'

interface Props {
    country: string
    isModalOpen: boolean,
    indicators: any
    setIsModalOpen: any
    setIndicador: any,
    setIsIndicadorOpen: any,
    filtros: any,
    filiais: any,
    database: any
}

export default function Indicadores(props: Props) {
    const [data, setData] = useState<any>()
    const [countryImage, setCountryImage] = useState(Brasil)

    const handleOk = () => {
        props.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    useEffect(() => {
        if (props.country === 'Germany') setCountryImage(Alemanha)
        if (props.country === 'South Africa') setCountryImage(Africa)
        if (props.country === 'Brazil') setCountryImage(Brasil)
        if (props.country === 'China') setCountryImage(China)
        if (props.country === 'India') setCountryImage(India)
        if (props.country === 'Portugal') setCountryImage(Portugal)
        if (props.country === 'United States') setCountryImage(USA)
        const value = props.indicators.filter((indicator: any) => indicator.id === props.country)
        if (value.length > 0) {
            const filtrados = props.filtros.filter((filtro: any) => filtro.selecionado === true)
            const filiais = props.filiais.filter((filial: any) => filial.selecionado === true)

            const filter: string[] = filtrados.map((filtro: any) => filtro.nome);
            const filial: string[] = filiais.map((filial: any) => filial.nome);

            const selected_filial = value.filter((indicador: any) => filial.includes(indicador.empresa))
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
            {data &&
                <Modal width={'95vw'} title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img width={50} src={countryImage} alt={`${data.country} Flag`} />
                        <span style={{ marginLeft: 10 }}>{`${data.id} Indicators`}</span>
                    </div>}
                    className={styles.modal}
                    open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}
                    footer={[]}>
                    <Tabela database={props.database}
                        selecionarIndicador={(event: any) => selecionarIndicador(event)}
                        country={props.country}
                        empresas={props.filiais
                            .filter((indicador: any) => indicador.selecionado)
                            .map((indicador: any) => indicador.nome)}
                        indicadores={props.filtros
                            .filter((indicador: any) => indicador.selecionado)
                            .map((indicador: any) => indicador.nome)} />
                </Modal>}
        </>
    )
}