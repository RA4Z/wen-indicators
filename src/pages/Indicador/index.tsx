import { Modal } from "antd"

import PlanvsReal from "./Charts/PlanvsReal";
import { useEffect, useState } from "react";

import Africa from 'images/bandeira africa.png'
import Brasil from 'images/bandeira brasil.png'
import China from 'images/bandeira china.png'
import India from 'images/bandeira india.png'
import Portugal from 'images/bandeira portugal.png'
import USA from 'images/bandeira usa.png'
import Estoques from "./Charts/Estoques";

interface Props {
    database: any
    country: string
    nome: string
    isIndicadorOpen: boolean
    setIsIndicadorOpen: any
}

export default function Indicador(props: Props) {
    const [data, setData] = useState<any>()
    const [countryImage, setCountryImage] = useState(Brasil)

    const handleOk = () => {
        props.setIsIndicadorOpen(false);
    };

    const handleCancel = () => {
        props.setIsIndicadorOpen(false);
    };

    useEffect(() => {
        let valor: any = props.database.filter((value: any) => value.indicador === props.nome)[0]
        if (valor === undefined) valor = props.database.filter((value: any) => value.Concatenar === props.nome)[0]
        setData(valor)
        if (props.country === 'South Africa') setCountryImage(Africa)
        if (props.country === 'Brazil') setCountryImage(Brasil)
        if (props.country === 'China') setCountryImage(China)
        if (props.country === 'India') setCountryImage(India)
        if (props.country === 'Portugal') setCountryImage(Portugal)
        if (props.country === 'United States') setCountryImage(USA)
    }, [props.nome, props.country, props.database])

    return (
        <>
            {data &&
                <Modal title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img width={50} src={countryImage} alt={`${props.country} Flag`} />
                        <span style={{ marginLeft: 10 }}>{`Indicador ${props.nome}`}</span>
                    </div>}
                    width={'90vw'}
                    open={props.isIndicadorOpen} onOk={handleOk} onCancel={handleCancel}
                    footer={[]}>
                    {props.nome.includes('Planejado vs Realizado') && <PlanvsReal data={data} />}
                    {props.nome.includes('Inventory') && <Estoques data={data} />}
                </Modal>}
        </>
    )
}