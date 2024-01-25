import { useState } from "react"

export interface TotalOrderState {
    total: number,
    change: (newTotal: number) => void,
    setToEmpty: () => void
}

export const useTotalOrderState = () => {

    const [total, setTotal] = useState<number>(0)
    const change = (newTotal: number) => {
        setTotal(newTotal)
    }

    const setToEmpty = () => {
        setTotal(0)
    }
    const selectedOrderState: TotalOrderState = {
        total: total,
        change: change,
        setToEmpty: setToEmpty
    }
    return selectedOrderState

}