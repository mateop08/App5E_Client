import { useState } from "react"

export interface toggleState {
    isToggle: boolean,
    toggle: () => void
}

const useToggle = () => {
    const [isToggle, setIsToggle] = useState<boolean>(false)

    const toggle = () => {
        setIsToggle(!isToggle)
    }

    const toggleState: toggleState = {
        toggle: toggle,
        isToggle: isToggle
    }

    return toggleState
}

export default useToggle