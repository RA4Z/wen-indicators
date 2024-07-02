import { Modal } from "antd";
import styles from './Resumo.module.scss'
import Global from 'images/global.png'
import Tabela from "pages/Indicadores/Tabela";

interface Props {
    isModalOpen: boolean
    setIsModalOpen: any,
    database: any
    filiais: any
    filtros: any
    setIndicador: any
    setIsIndicadorOpen: any
    setCountry: any
}

export default function Resumo(props: Props) {
    const handleOk = () => {
        props.setIsModalOpen(false);
    };

    const handleCancel = () => {
        props.setIsModalOpen(false);
    };

    function selecionarIndicador(nome: string, country: string) {
        props.setIsModalOpen(false);
        props.setIndicador(nome)
        props.setCountry(country)
        props.setIsIndicadorOpen(true)
    }

    return (
        <>
            <Modal width={'95vw'} title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img width={50} src={Global} alt={`Global Flag`} />
                    <span style={{ marginLeft: 10 }}>{`Global Summary of Indicators`}</span>
                </div>}
                className={styles.modal}
                open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[]}>
                <Tabela database={props.database} country='Global'
                    selecionarIndicador={(indicator: string, country: string) => selecionarIndicador(indicator, country)}
                    empresas={props.filiais
                        .filter((indicador: any) => indicador.selecionado)
                        .map((indicador: any) => indicador.nome)}
                    indicadores={props.filtros
                        .filter((indicador: any) => indicador.selecionado)
                        .map((indicador: any) => indicador.nome)} />
            </Modal>
        </>
    )
}