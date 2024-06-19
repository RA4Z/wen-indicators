import Mapa from 'assets/mapa-mundi.svg'
import Brasil from 'assets/brasil.png'
import India from 'assets/india.png'
import USA from 'assets/estados-unidos.png'
import Africa from 'assets/africa-do-sul.png'
import styles from './MapaMundi.module.scss'
import Indicadores from 'pages/Indicadores'
import { useState } from 'react'
import Indicador from 'pages/Indicador'
import Logo from 'assets/logo.png'

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
            <Indicador nome={indicador} isIndicadorOpen={isIndicadorOpen} setIsIndicadorOpen={setIsIndicadorOpen} />
            <img src={Mapa} alt="Mapa Mundial" />
            <div className={styles.countries}>
                <img src={Brasil} onClick={() => selectCountry('brasil')} className={styles.countries__brazil} alt='Ícone do Brasil' />
                <img src={India} onClick={() => selectCountry('india')} className={styles.countries__india} alt='Ícone da Índia' />
                <img src={USA} onClick={() => selectCountry('usa')} className={styles.countries__usa} alt='Ícone dos Estados Unidos' />
                <img src={Africa} onClick={() => selectCountry('africa')} className={styles.countries__africa} alt='Ícone da África do Sul' />
            </div>
            <img title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann' src={Logo} className={styles.logo} alt='Ícone da África do Sul' />
        </header>
    )
}