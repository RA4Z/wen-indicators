import styles from './Filter.module.scss'
import Logo from 'assets/logo.png'
import { Dropdown } from 'antd';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';

interface Props {
    filtros: any
    setFiltros: any
}

export default function Filter(props: Props) {
    const [open, setOpen] = useState(false)
    const [alterando, setAlterando] = useState(false)

    const onChange = (e: any, index: any) => {
        const novosFiltros = [...props.filtros];
        novosFiltros[index].selecionado = e.target.checked;
        props.setFiltros(novosFiltros);
        setAlterando(true)
    };

    const items: MenuProps['items'] = props.filtros.map((filtro: any, index: any) => ({
        key: index.toString(), // Use o índice como chave
        label: (
            <Checkbox
                checked={filtro.selecionado} // Define o estado do Checkbox
                onChange={(e) => onChange(e, index)}>
                {filtro.nome}
            </Checkbox>
        ),
    }));

    useEffect(() => {
        const info = localStorage.getItem('filtros_ativos');
        if (info) {
            const parsedInfo = JSON.parse(info);
            props.setFiltros(parsedInfo);
        }
    }, []);

    useEffect(() => {
        if (alterando) {
            const itemsString = JSON.stringify(props.filtros);
            localStorage.setItem('filtros_ativos', itemsString);
            setAlterando(false)
        }
    }, [props.filtros, alterando])

    return (
        <>
            <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }} open={open}>
                <img title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann'
                    onClick={() => setOpen(!open)} src={Logo} className={styles.logo} alt='Ícone da WEG' />
            </Dropdown>
        </>
    )
}