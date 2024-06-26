import { Modal } from "antd";
import { useState } from "react";
import SiteIMG from './images/site.png'
import PermissionIMG from './images/permission.png'
import ConfigIMG from './images/config.png'
import { Divider } from 'antd';

interface Props {
    open: boolean
}

export default function Disabled(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(props.open);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal title="Erro de conexão com o servidor, siga o passo a passo abaixo:"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <li>Acesse as informações do Site</li>
                <img style={{ width: '100%' }} src={SiteIMG} alt="Imagem mostrando endereço do Site" />
                <Divider />

                <li>Clique no botão das configurações</li>
                <img style={{ width: '100%' }} src={ConfigIMG} alt="Imagem mostrando Configurações do Site" />
                <Divider />

                <li>Em Conteúdo não seguro selecionar a opção "Permitir", assim você conseguirá se conectar ao servidor da rede do PCP</li>
                <img style={{ width: '100%' }} src={PermissionIMG} alt="Imagem mostrando Permissões do Site" />
                <Divider />

                <li>Aguardar alguns instantes e então atualize a página</li>
            </Modal>
        </>
    )
}