import { Modal, Carousel } from "antd"

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
    database: any
    indicadores: any
    automatic: boolean
    filtros: any
    filiais: any
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
        const countries = ['Brazil', 'United States', 'India', 'South Africa', 'China', 'Portugal'];
        let ind: DataItem[] = [];

        countries.forEach((country) => {
            const filteredIndicators = props.indicadores.filter((indicador: any) => indicador.id === country);

            if (filteredIndicators.length > 0) {
                // Verifica se encontrou indicadores para o país
                const filtrados = props.filtros.filter((filtro: any) => filtro.selecionado === true);
                const filiais = props.filiais.filter((filial: any) => filial.selecionado === true)

                const filter: string[] = filtrados.map((filtro: any) => filtro.nome);
                const filial: string[] = filiais.map((filial: any) => filial.nome);

                const selected_filial = filteredIndicators.filter((indicador:any) => filial.includes(indicador.empresa))
                const nomes = selected_filial.reduce((acc: string[], item: any) => {
                    const indicadoresFiltrados = item.indicadores.filter((indicador: string) =>
                        filter.some(nomeFiltro => indicador.includes(nomeFiltro))
                    );
                    return [...acc, ...indicadoresFiltrados];
                }, []);

                // Adiciona os indicadores filtrados ao array 'ind'
                nomes.forEach((indicador: any) => {
                    ind.push({ country: country, indicador: indicador });
                });
            }
            setData(ind);
        });
    }, [props.indicadores, props.filtros, props.filiais]);

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
                                    <PlanvsReal data={props.database.filter((ind: any) => ind.indicador === item.indicador)[0]} />}

                                {item.indicador.includes('Inventory') &&
                                    <Estoques data={props.database.filter((ind: any) => ind.Concatenar === item.indicador)[0]} />}
                            </div>
                        ))}
                    </Carousel>}
            </Modal>
        </>
    )
}