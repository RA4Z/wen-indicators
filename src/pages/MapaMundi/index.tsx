import Mapa from 'assets/mapa-mundi.svg'
import Brasil from 'assets/brasil.png'
import India from 'assets/india.png'
import USA from 'assets/estados-unidos.png'
import styles from './MapaMundi.module.scss'

export default function MapaMundi() {
    return (
        <header className={styles.app}>
            <img src={Mapa} alt="Mapa Mundial" />
            <div className={styles.countries}>
                <img src={Brasil} className={styles.countries__brazil} alt='Ícone do Brasil' />
                <img src={India} className={styles.countries__india} alt='Ícone da Índia' />
                <img src={USA} className={styles.countries__usa} alt='Ícone dos Estados Unidos' />
            </div>
        </header>
    )
}