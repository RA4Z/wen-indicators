import styles from './Filter.module.scss'
import Logo from 'assets/logo.png'
import { Dropdown } from 'antd';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'

interface Props {
    filtros: any
    setFiltros: any
    filiais: any
    setFiliais: any
}

export default function Filter({ filtros, setFiltros, filiais, setFiliais }: Props) {
    const [open, setOpen] = useState(false)
    const [alterando, setAlterando] = useState(false)

    const onChange = (e: any, index: any) => {
        const novosFiltros = [...filtros];
        novosFiltros[index].selecionado = e.target.checked;
        setFiltros(novosFiltros);
        setAlterando(true)
    };

    const onChangeFilial = (e: any, index: any) => {
        const novasFiliais = [...filiais];
        novasFiliais[index].selecionado = e.target.checked;
        setFiliais(novasFiliais);
        setAlterando(true)
    };

    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'sub1',
            icon: <MailOutlined />,
            label: 'Indicadores',
            children: filtros.map((filtro: any, index: any) => ({
                key: index.toString(), // Use o índice como chave
                label: (
                    <Checkbox
                        checked={filtro.selecionado} // Define o estado do Checkbox
                        onChange={(e) => onChange(e, index)}>
                        {filtro.nome}
                    </Checkbox>
                ),
            })),
        },
        {
            key: 'sub2',
            icon: <AppstoreOutlined />,
            label: 'Empresas',
            children: filiais.map((filial: any, index: any) => ({
                key: index.toString(), // Use o índice como chave
                label: (
                    <Checkbox
                        checked={filial.selecionado} // Define o estado do Checkbox
                        onChange={(e) => onChangeFilial(e, index)}>
                        {filial.nome}
                    </Checkbox>
                ),
            })),
        },
    ];

    useEffect(() => {
        const info = localStorage.getItem('filtros_ativos');

        if (info) {
            const parsedInfo = JSON.parse(info);

            // Atualiza o estado 'filtros' com o novo array mapeado
            setFiltros(filtros.map((filtro: any) => {
                const infoFiltro = parsedInfo.find(
                    (infoItem: any) => infoItem.nome === filtro.nome
                );
                if (infoFiltro) {
                    return {
                        ...filtro,
                        selecionado: infoFiltro.selecionado,
                    };
                }
                return filtro;
            }));
        }

        const filialLocal = localStorage.getItem('filiais_ativas');
        if (filialLocal) {
            const parsedInfo = JSON.parse(filialLocal);

            // Atualiza o estado 'filiais' com o novo array mapeado
            setFiliais(filiais.map((filial: any) => {
                const infoFiltro = parsedInfo.find(
                    (infoItem: any) => infoItem.nome === filial.nome
                );
                if (infoFiltro) {
                    return {
                        ...filial,
                        selecionado: infoFiltro.selecionado,
                    };
                }
                return filial;
            }));
        }
    }, []);

    useEffect(() => {
        if (alterando) {
            const itemsString = JSON.stringify(filtros);
            localStorage.setItem('filtros_ativos', itemsString);
            const filiaisString = JSON.stringify(filiais);
            localStorage.setItem('filiais_ativas', filiaisString);
            setAlterando(false)
        }
    }, [filtros, filiais, alterando])

    return (
        <>
            <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }} open={open}>
                <img title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann'
                    onClick={() => setOpen(!open)} src={Logo} className={styles.logo} alt='Ícone da WEG' />
            </Dropdown>
        </>
    )
}