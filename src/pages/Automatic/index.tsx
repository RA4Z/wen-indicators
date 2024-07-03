import { Modal, Carousel } from "antd"

import { useEffect, useState } from "react";

import Africa from 'images/bandeira africa.png'
import Global from 'images/global.png'
import Alemanha from 'images/bandeira alemanha.png'
import Brasil from 'images/bandeira brasil.png'
import China from 'images/bandeira china.png'
import India from 'images/bandeira india.png'
import Portugal from 'images/bandeira portugal.png'
import USA from 'images/bandeira usa.png'
import Estoques from "pages/Indicador/Charts/Estoques";
import OVs from "pages/Indicador/Charts/OVs";
import Tabela from "pages/Indicadores/Tabela";

interface Props {
    results: any[]
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
        { country: 'Global', image: Global },
        { country: 'Menu', image: Global },
        { country: 'Brazil', image: Brasil },
        { country: 'United States', image: USA },
        { country: 'South Africa', image: Africa },
        { country: 'China', image: China },
        { country: 'India', image: India },
        { country: 'Germany', image: Alemanha },
        { country: 'Portugal', image: Portugal }]

    useEffect(() => {
        const countries = ['Global', 'Brazil', 'United States', 'India', 'South Africa', 'China', 'Portugal', 'Germany'];
        let ind: DataItem[] = [];

        countries.forEach((country) => {
            const filteredIndicators = props.indicadores.filter((indicador: any) => indicador.id === country);
            const filtrados = props.filtros.filter((filtro: any) => filtro.selecionado === true);
            const filter: string[] = filtrados.map((filtro: any) => filtro.nome);

            if (filteredIndicators.length > 0) {
                // Verifica se encontrou indicadores para o país
                const filiais = props.filiais.filter((filial: any) => filial.selecionado === true)
                const filial: string[] = filiais.map((filial: any) => filial.nome);

                const selected_filial = filteredIndicators.filter((indicador: any) => filial.includes(indicador.empresa))

                const nomes = selected_filial.reduce((acc: string[], item: any) => {
                    const indicadoresFiltrados = item.indicadores.filter((indicador: string) =>
                        filter.some(nomeFiltro => indicador.includes(nomeFiltro))
                    );
                    return [...acc, ...indicadoresFiltrados];
                }, []);

                nomes.forEach((indicador: any) => {
                    ind.push({ country: country, indicador: indicador });
                });
            }
            ind.sort((a: any, b: any) => {
                const keyA = filter.find(key => a.indicador.includes(key));
                const keyB = filter.find(key => b.indicador.includes(key));

                // Se os indicadores tiverem a mesma prioridade, mantém a ordem original
                if (keyA === keyB) return 0;
                if (keyA && keyB) return filter.indexOf(keyA) - filter.indexOf(keyB);
                return 0
            })

            const result = [];
            let currentIndicador = "";

            for (const item of ind) {
                const curr = filter.find(key => item.indicador.includes(key))!

                if (curr !== currentIndicador) {
                    result.push({ country: "Menu", indicador: curr });
                    currentIndicador = curr
                }

                // Adicionar o item atual
                result.push(item);
            }

            setData(result);
        });
    }, [props.indicadores, props.filtros, props.filiais]);

    return (
        <>
            <Modal width={'95vw'} open={props.automatic} footer={[]} closable={false}>
                {data &&
                    <Carousel autoplay infinite>
                        {data.map((item, index) => (
                            <div key={`slide-${index}`}>
                                {item.country !== 'Menu' ? <div>
                                    <div style={contentStyle}>
                                        <img
                                            width={50}
                                            src={
                                                countryImage.filter(country => country.country === item.country)[0]
                                                    .image
                                            }
                                            alt={`${item.country} Flag`}
                                        />
                                        <h3 style={{ marginLeft: 10 }}>{item.indicador}</h3>
                                    </div>
                                    {item.indicador.includes('Inventory') && (
                                        <Estoques
                                            name={item.indicador}
                                            data={props.database.filter((ind: any) => ind.Concatenar === item.indicador)[0]}
                                        />
                                    )}
                                    {(item.indicador.includes('On time Delivery') ||
                                        item.indicador.includes('Efficiency')) && (
                                            <OVs
                                                name={item.indicador}
                                                data={props.database.filter((ind: any) => ind.Indicador === item.indicador)[0]}
                                            />
                                        )}

                                </div> :
                                    <Tabela database={props.results} country="Global"
                                        empresas={props.filiais.filter((filial: any) => filial.selecionado === true).map((filial: any) => filial.nome)}
                                        indicadores={[props.filtros.filter((filtro: any) => filtro.selecionado === true).map((filtro: any) => filtro.nome).find((key: string) => item.indicador.includes(key))]} />
                                }
                            </div>
                        ))}
                    </Carousel>}
            </Modal>
        </>
    )
}