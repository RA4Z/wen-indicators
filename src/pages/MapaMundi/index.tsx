import styles from './MapaMundi.module.scss'
import Indicadores from 'pages/Indicadores'
import { useEffect, useState } from 'react'
import Indicador from 'pages/Indicador'
import MapChart from './MapChart'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button, Tooltip, message } from 'antd';
import Automatic from 'pages/Automatic'
import Filter from 'components/Filter'
import { getDatabase, getIndicadores } from 'services/requisition'

export default function MapaMundi() {
    const [automatic, setAutomatic] = useState(false)
    const [country, setCountry] = useState('')
    const [indicador, setIndicador] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIndicadorOpen, setIsIndicadorOpen] = useState(false)
    const [database, setDatabase] = useState([])
    const [indicators, setIndicators] = useState([])
    const [filtros, setFiltros] = useState([
        {
            nome: 'Inventory*',
            selecionado: true
        },
        {
            nome: 'Inventory Turns',
            selecionado: true
        }
    ])
    const [filiais, setFiliais] = useState([
        {
            nome: 'JGS',
            selecionado: true
        },
        {
            nome: 'WSB',
            selecionado: true
        },
        {
            nome: 'HISA',
            selecionado: true
        },
        {
            nome: 'TGM',
            selecionado: true
        }
    ])

    useEffect(() => {
        async function getData() {
            console.log(await getIndicadores())
            setIndicators(await getIndicadores())
            setDatabase(await getDatabase())
        }
        getData()
    }, [])

    function selectCountry(country: string) {
        setAutomatic(false)
        setCountry(country)
        setIsModalOpen(true);
    }

    return (
        <header className={styles.app}>
            <Automatic indicadores={indicators} database={database} automatic={automatic} filtros={filtros} />

            <Indicadores indicators={indicators} country={country} isModalOpen={isModalOpen} filtros={filtros}
                setIsModalOpen={setIsModalOpen} setIsIndicadorOpen={setIsIndicadorOpen} setIndicador={setIndicador} />

            <Indicador database={database} country={country}
                nome={indicador} isIndicadorOpen={isIndicadorOpen} setIsIndicadorOpen={setIsIndicadorOpen} />

            <MapChart selectCountry={selectCountry} />
            <Filter filtros={filtros} setFiltros={setFiltros} filiais={filiais} setFiliais={setFiliais} />

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