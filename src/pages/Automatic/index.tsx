import { Modal, Carousel } from "antd"

import indicadores from 'data/indicadores.json'
import valores from 'data/valores.json'
import stocks from 'data/dados estoques.json'

import { useEffect, useState } from "react";

import Africa from 'images/bandeira africa.png'
import Brasil from 'images/bandeira brasil.png'
import PlanvsReal from "pages/Indicador/Charts/PlanvsReal";
import China from 'images/bandeira china.png'
import India from 'images/bandeira india.png'
import Portugal from 'images/bandeira portugal.png'
import USA from 'images/bandeira usa.png'
import Estoques from "pages/Indicador/Charts/Estoques";

interface Props {
    automatic: boolean
}

interface DataItem {
    country: string;
    indicador: string;
}

const contentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    paddingLeft: 10,
    marginBottom: 10,
    color: '#fff',
    lineHeight: '50px',
    textAlign: 'center',
    background: '#364d79',
};

export default function Automatic(props: Props) {
    const [data, setData] = useState<DataItem[]>()
    const countryImage = [
        { country: 'Brazil', image: Brasil },
        { country: 'United States', image: USA },
        { country: 'South Africa', image: Africa },
        { country: 'China', image: China },
        { country: 'India', image: India },
        { country: 'Portugal', image: Portugal }]

    useEffect(() => {
        const countries = ['Brazil', 'United States', 'India', 'South Africa', 'China', 'Portugal']
        let ind: DataItem[] = []
        countries.forEach((country) => {
            const filteredIndicators = indicadores.filter(indicador => indicador.id === country);
            filteredIndicators[0].indicadores.forEach((indicador) => ind.push({ country: country, indicador: indicador }))
        });
        setData(ind)
    }, [])

    return (
        <>
            <Modal width={'95vw'} open={props.automatic} footer={[]} closable={false}>
                {data &&
                    <Carousel autoplay infinite>
                        {data.map((item, index) => (
                            <div key={index} >
                                <div style={contentStyle}>
                                    <img width={50} src={countryImage.filter(country => country.country === item.country)[0].image} alt={`${item.country} Flag`} />
                                    <h3 style={{ marginLeft: 10 }}>{item.indicador}</h3>
                                </div>
                                {item.indicador.includes('Planejado vs Realizado') &&
                                    <PlanvsReal data={valores.filter(ind => ind.indicador === item.indicador)[0]} />}

                                {item.indicador.includes('Stocks') &&
                                    <Estoques data={stocks.filter(ind => ind.Concatenar === item.indicador)[0]}
                                        last={stocks.filter(ind => ind.Concatenar.includes(item.indicador)  && ind.Year === 2023)[0]}
                                    />}
                            </div>
                        ))}
                    </Carousel>}
            </Modal>
        </>
    )
}