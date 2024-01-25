import { useState } from "react"

export const useAlert = () => {

    const [ isShownAlert, setIsShownAlert] = useState<boolean>(false)

    const showAlert = () => {
        setIsShownAlert(true)
    }

    const hideAlert = () => {
        setIsShownAlert(false)
    }

    return {isShownAlert, showAlert, hideAlert}
}