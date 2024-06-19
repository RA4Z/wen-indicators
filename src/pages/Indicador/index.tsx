import { Modal } from "antd"
import LineIndicator from "./LineIndicator";

interface Props {
    nome: string
    isIndicadorOpen: boolean
    setIsIndicadorOpen: any
}
export default function Indicador(props: Props) {
    const handleOk = () => {
        props.setIsIndicadorOpen(false);
    };

    const handleCancel = () => {
        props.setIsIndicadorOpen(false);
    };
    return (
        <>
            <Modal title={`Indicadores ${props.nome}`}
                width={'90vw'}
                open={props.isIndicadorOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[]}>
                <LineIndicator nome={props.nome} />
            </Modal>
        </>
    )
}