import styles from './Filter.module.scss'
import Logo from 'assets/logo.png'
import { Dropdown } from 'antd';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import type { DropdownProps, GetProp, MenuProps } from 'antd';
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
    const [allFiltrosSelected, setAllFiltrosSelected] = useState(filtros.every((filtro: any) => filtro.selecionado));
    const [allFiliaisSelected, setAllFiliaisSelected] = useState(filiais.every((filial: any) => filial.selecionado));

    const onChange = (e: any, index: any) => {
        const novosFiltros = [...filtros];
        novosFiltros[index].selecionado = e.target.checked;
        setFiltros(novosFiltros);
        setAlterando(true)
        setAllFiltrosSelected(novosFiltros.every((filtro) => filtro.selecionado));
    };

    const onChangeAllFiltros = (e: any) => {
        const novosFiltros = filtros.map((filtro: any) => ({ ...filtro, selecionado: e.target.checked }));
        setFiltros(novosFiltros);
        setAllFiltrosSelected(e.target.checked);
        setAlterando(true);
    };

    const onChangeFilial = (e: any, index: any) => {
        const novasFiliais = [...filiais];
        novasFiliais[index].selecionado = e.target.checked;
        setFiliais(novasFiliais);
        setAlterando(true)
        setAllFiliaisSelected(novasFiliais.every((filial) => filial.selecionado));
    };

    const onChangeAllFiliais = (e: any) => {
        const novasFiliais = filiais.map((filial: any) => ({ ...filial, selecionado: e.target.checked }));
        setFiliais(novasFiliais);
        setAllFiliaisSelected(e.target.checked);
        setAlterando(true);
    };

    type MenuItem = GetProp<MenuProps, 'items'>[number];

    const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setOpen(nextOpen);
        }
    };

    // Função para evitar que o dropdown feche ao clicar em um checkbox
    const preventCloseDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const items: MenuItem[] = [
        {
            key: 'Indicadores',
            icon: <MailOutlined />,
            label: 'Indicadores',
            children:
                [
                    {
                        key: 'todos-filtros',
                        label: (
                            <div onClick={preventCloseDropdown}>
                                <Checkbox
                                    indeterminate={!allFiltrosSelected && filtros.some((filtro: any) => filtro.selecionado)}
                                    checked={allFiltrosSelected}
                                    onChange={onChangeAllFiltros}>
                                    Selecionar Todos
                                </Checkbox>
                            </div>
                        ),
                    },
                    {
                        type: 'divider',
                    },
                    ...filtros.map((filtro: any, index: any) => ({
                        key: `${filtro.nome}-${index}`,
                        label: (
                            <div onClick={preventCloseDropdown}>
                                <Checkbox
                                    checked={filtro.selecionado}
                                    onChange={(e) => onChange(e, index)}>
                                    {filtro.nome}
                                </Checkbox>
                            </div>
                        ),
                    })),
                ],
        },
        {
            key: 'Empresas',
            icon: <AppstoreOutlined />,
            label: 'Empresas',
            children: [
                {
                    key: 'todos-filiais',
                    label: (
                        <div onClick={preventCloseDropdown}>
                            <Checkbox
                                indeterminate={!allFiliaisSelected && filiais.some((filial: any) => filial.selecionado)}
                                checked={allFiliaisSelected}
                                onChange={onChangeAllFiliais}>
                                Selecionar Todos
                            </Checkbox>
                        </div>
                    ),
                },
                {
                    type: 'divider',
                },
                ...filiais.map((filial: any, index: any) => ({
                    key: `${filial.nome}-${index}`,
                    open: true,
                    label: (
                        <div onClick={preventCloseDropdown}>
                            <Checkbox
                                checked={filial.selecionado}
                                onChange={(e) => onChangeFilial(e, index)}>
                                {filial.nome}
                            </Checkbox>
                        </div>
                    ),
                }))
            ]
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
            <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }} open={open}
                onOpenChange={handleOpenChange}>
                <img onClick={(e) => e.preventDefault()} title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann'
                    src={Logo} className={styles.logo} alt='Ícone da WEG' />
            </Dropdown>
        </>
    )
}