import styles from './MapaMundi.module.scss'
import Indicadores from 'pages/Indicadores'
import { useState } from 'react'
import Indicador from 'pages/Indicador'
import Logo from 'assets/logo.png'
import MapChart from './MapChart'

export default function MapaMundi() {
    const [country, setCountry] = useState('')
    const [indicador, setIndicador] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIndicadorOpen, setIsIndicadorOpen] = useState(false)

    function selectCountry(country: string) {
        setCountry(country)
        setIsModalOpen(true);
    }

    return (
        <header className={styles.app}>
            <Indicadores country={country} isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} setIsIndicadorOpen={setIsIndicadorOpen} setIndicador={setIndicador} />
            <Indicador country={country} nome={indicador} isIndicadorOpen={isIndicadorOpen} setIsIndicadorOpen={setIsIndicadorOpen} />
            <MapChart selectCountry={selectCountry} />
            <img title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann' src={Logo} className={styles.logo} alt='Ícone da África do Sul' />
        </header>
    )
}