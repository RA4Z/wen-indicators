import styles from './MapaMundi.module.scss'
import Indicadores from 'pages/Indicadores'
import { useEffect, useState } from 'react'
import Indicador from 'pages/Indicador'
import MapChart from './MapChart'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button, Tooltip, message } from 'antd';
import Automatic from 'pages/Automatic'
import Filter from 'components/Filter'
import { getDatabase, getIndicadores, getResults } from 'services/requisition'
import Disabled from 'components/Disabled'
import Resumo from 'pages/Automatic/Resumo'

export default function MapaMundi() {
    const [disabledError, setDisabledError] = useState(false)
    const [showResumo, setShowResumo] = useState(false)
    const [automatic, setAutomatic] = useState(false)
    const [country, setCountry] = useState('')
    const [indicador, setIndicador] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIndicadorOpen, setIsIndicadorOpen] = useState(false)
    const [database, setDatabase] = useState([])
    const [indicators, setIndicators] = useState([])
    const [results, setResults] = useState([])
    const [filtros, setFiltros] = useState([
        {
            nome: 'On time Delivery',
            selecionado: true
        },
        {
            nome: 'Inventory*',
            selecionado: true
        },
        {
            nome: 'Inventory Turns',
            selecionado: true
        },
        {
            nome: 'Efficiency',
            selecionado: true
        }
    ])
    const [filiais, setFiliais] = useState([
        {
            nome: 'GLOBAL',
            selecionado: true
        },
        {
            nome: 'JGS',
            selecionado: true
        },
        {
            nome: 'WSB',
            selecionado: true
        },
        {
            nome: 'WTB',
            selecionado: true
        },
        {
            nome: 'EOL',
            selecionado: true
        },
        {
            nome: 'TGM',
            selecionado: true
        },
        {
            nome: 'WII',
            selecionado: true
        },
        {
            nome: 'WEM',
            selecionado: true
        },
        {
            nome: 'WPT',
            selecionado: true
        },
        {
            nome: 'WNT',
            selecionado: true
        },
        {
            nome: 'KANNIS',
            selecionado: true
        }
    ])

    useEffect(() => {
        async function getData() {
            const indicadores = await getIndicadores()
            if (indicadores.length === 0) setDisabledError(true)
            setIndicators(indicadores)
            setDatabase(await getDatabase())
            setResults(await getResults())
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
            <Disabled open={disabledError} setOpen={setDisabledError} />
            <Automatic filiais={filiais} indicadores={indicators} database={database} automatic={automatic} filtros={filtros} />

            <Resumo setCountry={setCountry} database={results} filiais={filiais} isModalOpen={showResumo} filtros={filtros}
                setIsModalOpen={setShowResumo} setIsIndicadorOpen={setIsIndicadorOpen} setIndicador={setIndicador} />

            <Indicadores database={results} filiais={filiais} indicators={indicators} country={country} isModalOpen={isModalOpen} filtros={filtros}
                setIsModalOpen={setIsModalOpen} setIsIndicadorOpen={setIsIndicadorOpen} setIndicador={setIndicador} />

            <Indicador database={database} country={country}
                nome={indicador} isIndicadorOpen={isIndicadorOpen} setIsIndicadorOpen={setIsIndicadorOpen} />

            <MapChart selectCountry={selectCountry} />
            <Filter filtros={filtros} setFiltros={setFiltros} filiais={filiais} setFiliais={setFiliais} setShowResumo={setShowResumo} />

            <Tooltip title={automatic ? 'Pause Exhibition' : 'Start Exhibition'} color='geekblue'>
                <Button icon={automatic ? <PauseOutlined /> : <CaretRightOutlined />}
                    className={styles.automatic} type="primary" shape="round" size='large'
                    onClick={() => {
                        setAutomatic(!automatic);
                        message.info(automatic ? 'Automatic Exhibition Paused' : 'Automatic Exhibition Started')
                    }} />
            </Tooltip>

        </header>
    )
}