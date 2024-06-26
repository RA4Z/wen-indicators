import { Modal } from "antd";
import SiteIMG from './images/site.png'
import PermissionIMG from './images/permission.png'
import ConfigIMG from './images/config.png'
import { Divider } from 'antd';

interface Props {
    open: boolean
    setOpen: any
}

export default function Disabled(props: Props) {
    const handleOk = () => {
        props.setOpen(false);
    };

    const handleCancel = () => {
        props.setOpen(false);
    };
    return (
        <>
            <Modal title="Erro de conexão com o servidor, siga o passo a passo abaixo:"
                open={props.open} onOk={handleOk} onCancel={handleCancel}>

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