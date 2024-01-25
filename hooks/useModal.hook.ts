import { useState } from "react"
export interface ModalGestor {
    isModalVisible: boolean,
    toggleModal: () => void,
}

const useModal = () => {

    const [isModalVisible, setModal] = useState<boolean>(false);
    const toggleModal = () => setModal(!isModalVisible);
    const modalGestor: ModalGestor = {isModalVisible, toggleModal}
    return modalGestor

}

export default useModal