import { Modal, Carousel } from "antd"
import indicadores from 'data/indicadores.json'
import valores from 'data/valores.json'
import { useEffect, useState } from "react";

// import Africa from 'images/bandeira africa.png'
import Brasil from 'images/bandeira brasil.png'
import PlanvsReal from "pages/Indicador/Charts/PlanvsReal";
// import China from 'images/bandeira china.png'
// import India from 'images/bandeira india.png'
// import Portugal from 'images/bandeira portugal.png'
// import USA from 'images/bandeira usa.png'

interface Props {
    automatic: boolean
}

const contentStyle: React.CSSProperties = {
    height: '50px',
    color: '#fff',
    lineHeight: '50px',
    textAlign: 'center',
    background: '#364d79',
};

export default function Automatic(props: Props) {
    const [country, setCountry] = useState('Brazil')
    const [data, setData] = useState<typeof indicadores[0]>()
    const [countryImage, setCountryImage] = useState(Brasil)

    useEffect(() => {
        const value = indicadores.filter(indicador => indicador.id === country)
        setData(value[0])
    }, [country])

    return (
        <>
            <Modal title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img width={50} src={countryImage} alt={`Flag`} />
                    <span style={{ marginLeft: 10 }}>{`Exibição Automática de Indicadores WEN`}</span>
                </div>}
                width={'90vw'} open={props.automatic} footer={[]} closable={false}>
                {data &&
                    <Carousel autoplay infinite>
                        {data.indicadores.map((item, index) => (
                            <div key={index}>
                                <h3 style={contentStyle}>{item}</h3>
                                {item.includes('Planejado vs Realizado') &&
                                    <PlanvsReal data={
                                        valores.filter(ind => ind.indicador === item)[0]} />}
                            </div>
                        ))}
                    </Carousel>}
            </Modal>
        </>
    )
}