import Mapa from 'assets/mapa-mundi.svg'
import Brasil from 'assets/brasil.png'
import India from 'assets/india.png'
import USA from 'assets/estados-unidos.png'
import './styles.css'

export default function MapaMundi() {
    return (
        <header className="App">
            <img src={Mapa} className="App-logo" alt="logo" />
            <img src={Brasil} className='brazil' alt='Ícone do Brasil' />
            <img src={India} className='india' alt='Ícone do Brasil' />
            <img src={USA} className='usa' alt='Ícone do Brasil' />
        </header>
    )
}