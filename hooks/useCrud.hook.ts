import { useState } from "react"

export type CrudAction = 'create' | 'update' | 'none'

export interface Crud {
  isCreating: boolean,
  isUpdating: boolean,
  setToCreate: () => void,
  setToUpdate: () => void,
  setToNone: () => void
}

const useCrud = () => {

  const [action, setAction] = useState<CrudAction>('none')

  const isCreating = (action === 'create') ? true : false
  const isUpdating = (action === 'update') ? true : false

  const setToCreate = () => {
    setAction('create')
  }

  const setToUpdate = () => {
    setAction('update')
  }

  const setToNone = () => {
    setAction("none")
  }
  
  const crud: Crud = {isCreating, isUpdating, setToCreate, setToUpdate, setToNone}
  return crud

}

export default useCrud