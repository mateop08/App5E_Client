import useCrud, { Crud } from "@/hooks/useCrud.hook"
import useModal, { ModalGestor } from "@/hooks/useModal.hook"

export interface EvidencesModalState {
    formWindow: ModalGestor,
    crud: Crud
}

export const useEvidencesModalsState = () => {
    const formWindow = useModal()
    const crud = useCrud()

    const EvidencesModalState: EvidencesModalState = {
        formWindow: formWindow,
        crud: crud
    }
    return EvidencesModalState
}