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

export default function Filter({ filtros, setFiltros }: Props) {
    const [open, setOpen] = useState(false)
    const [alterando, setAlterando] = useState(false)

    const onChange = (e: any, index: any) => {
        const novosFiltros = [...filtros];
        novosFiltros[index].selecionado = e.target.checked;
        setFiltros(novosFiltros);
        setAlterando(true)
    };

    const items: MenuProps['items'] = filtros.map((filtro: any, index: any) => ({
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
      
          // Percorre cada filtro em 'filtros'
          const filtrosAtualizados = filtros.map((filtro:any) => {
            // Tenta encontrar um filtro correspondente em 'parsedInfo'
            const infoFiltro = parsedInfo.find(
              (infoItem:any) => infoItem.nome === filtro.nome
            );
      
            // Se encontrar um filtro correspondente, atualiza 'selecionado'
            if (infoFiltro) {
              return {
                ...filtro,
                selecionado: infoFiltro.selecionado,
              };
            }
      
            // Caso contrário, mantém o filtro original
            return filtro;
          });
      
          setFiltros(filtrosAtualizados);
        }
      }, []);

    useEffect(() => {
        if (alterando) {
            const itemsString = JSON.stringify(filtros);
            localStorage.setItem('filtros_ativos', itemsString);
            setAlterando(false)
        }
    }, [filtros, alterando])

    return (
        <>
            <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }} open={open}>
                <img title='Projeto Desenvolvido e Prototipado por Robert Aron Zimmermann'
                    onClick={() => setOpen(!open)} src={Logo} className={styles.logo} alt='Ícone da WEG' />
            </Dropdown>
        </>
    )
}