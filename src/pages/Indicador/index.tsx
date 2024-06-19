import { Modal } from "antd"
import valores from 'data/valores.json'
import PlanvsReal from "./Charts/PlanvsReal";
import { useEffect, useState } from "react";

interface Props {
    nome: string
    isIndicadorOpen: boolean
    setIsIndicadorOpen: any
}
export default function Indicador(props: Props) {
    const [data, setData] = useState<typeof valores[0]>()
    const handleOk = () => {
        props.setIsIndicadorOpen(false);
    };

    const handleCancel = () => {
        props.setIsIndicadorOpen(false);
    };

    useEffect(() => {
        const valor = valores.filter(value => value.indicador === props.nome)[0]
        setData(valor)
    }, [props.nome])
    
    return (
        <>
            {data && <Modal title={`Indicadores ${props.nome}`}
                width={'90vw'}
                open={props.isIndicadorOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[]}>
                {props.nome === 'Planejado vs Realizado JGS' && <PlanvsReal data={data} />}
            </Modal>}
        </>
    )
}