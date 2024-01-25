import { useState } from "react"

export interface ActiveState {
    active: boolean,
    activate: () => void,
    deactivate: () => void
}

const useActive = () => {
    const [active, setActive] = useState<boolean>(false)

    const activate = () => {
        setActive(true)
    }
    const deactivate = () => {
        setActive(false)
    }

    const activeState: ActiveState = {
        active: active,
        activate: activate,
        deactivate: deactivate
    }
    return activeState
}

export default useActive