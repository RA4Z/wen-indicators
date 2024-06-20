import styles from './MapaMundi.module.scss'
import Indicadores from 'pages/Indicadores'
import { useState } from 'react'
import Indicador from 'pages/Indicador'
import Logo from 'assets/logo.png'
import MapChart from './MapChart'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button, Tooltip, message } from 'antd';
import Automatic from 'pages/Automatic'

export default function MapaMundi() {
    const [automatic, setAutomatic] = useState(false)
    const [country, setCountry] = useState('')
    const [indicador, setIndicador] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIndicadorOpen, setIsIndicadorOpen] = useState(false)

    function selectCountry(country: string) {
        setAutomatic(false)
        setCountry(country)
        setIsModalOpen(true);
    }

    return (
        <header className={styles.app}>
            <Automatic automatic={automatic} />

            <Indicadores country={country} isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} setIsIndicadorOpen={setIsIndicadorOpen} setIndicador={setIndicador} />

            <Indicador country={country} nome={indicador} isIndicadorOpen={isIndicadorOpen} setIsIndicadorOpen={setIsIndicadorOpen} />

            <MapChart selectCountry={selectCountry} />
            <img title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann' src={Logo} className={styles.logo} alt='Ícone da África do Sul' />

            <Tooltip title={automatic ? 'Pausar Exibição' : 'Iniciar Exibição'} color='geekblue'>
                <Button icon={automatic ? <PauseOutlined /> : <CaretRightOutlined />}
                    className={styles.automatic} type="primary" shape="round" size='large'
                    onClick={() => {
                        setAutomatic(!automatic);
                        message.info(automatic ? 'Exibição Automática Pausada' : 'Exibição Automática Iniciada')
                    }} />
            </Tooltip>

        </header>
    )
}