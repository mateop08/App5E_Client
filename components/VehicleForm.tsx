import VehicleGestor, { Vehicle } from "@/models/Vehicles.model"
import { Controller, useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"
import { FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap"
import VehiclePlateTypeGestor, { VehiclePlateType } from "@/models/VehiclePlateTypes.model"
import { useEffect, useState } from "react"
import VehicleManufacterGestor from "@/models/VehicleManufacters.model"
import VehicleLineGestor from "@/models/VehicleLines.model"
import VehicleYearGestor from "@/models/VehicleYears.model"
import VehicleEngineGestor from "@/models/VehicleEngines.model"
//import { useReceptionContext } from "../context/ReceptionContext"
import FormError from "@/components/FormError"
import { ModalGestor } from "@/hooks/useModal.hook"
import { Crud } from "@/hooks/useCrud.hook"
import { SelectVehicleState } from "@/hooks/useSelectVehicle.hooks"
import VehicleFuelTypeGestor, { VehicleFuelType } from "@/models/VehicleFuelTypes.model"

interface VehiclesForm {
    ModalGestor: ModalGestor,
    Crud: Crud,
    OnSaveCallback: (vehicle: Vehicle) => void,
    SelectVehicle: SelectVehicleState
}

type OptionType = {label: string,value: number}
type SelectOptionType = OptionType | null
type options = SelectOptionType[]

interface vehicleForm extends Pick<Vehicle, 'Plate' | 'PlateType' | 'FuelType'> {
    ManufacterOption: SelectOptionType,
    LineOption: SelectOptionType,
    YearOption: SelectOptionType,
    EngineOption: SelectOptionType
}

const VehiclesForm: React.FC<VehiclesForm> = (props) => {
    const {ModalGestor: {isModalVisible, toggleModal,},
        Crud: { isCreating, isUpdating},
        SelectVehicle:{change, exists, setToExists, vehicle},
        OnSaveCallback} = props

    const emptySelect: SelectOptionType = null

    const initialState: vehicleForm = {
        Plate: '',
        PlateType: '',
        FuelType: '',
        ManufacterOption: emptySelect,
        LineOption: emptySelect,
        YearOption: emptySelect,
        EngineOption: emptySelect
    }

    
    const { handleSubmit, reset, watch, setValue, control, register, formState:  {errors}} = useForm<vehicleForm>({defaultValues: initialState})
    
    const [plateTypes, setPlateTypes] = useState<VehiclePlateType[]>([])
    const [fuelTypes, setFuelTypes] = useState<VehicleFuelType[]>([])
    const [vehicleManufacters, setVehicleManufacters] = useState<options>([])
    const [vehicleLines, setVehicleLines] = useState<options>([])
    const [vehicleYears, setVehicleYears] = useState<options>([])
    const [vehicleEngines, setVehicleEngines] = useState<options>([])

    const getVehiclePlateTypesList = () => {
        VehiclePlateTypeGestor.ListAll().then( 
            (data) => {
                setPlateTypes(data)
            },
            (error) => {
                window.alert(error)
            })
    }

    const getVehicleFuelTypesList = () => {
        VehicleFuelTypeGestor.ListAll().then( 
            (data) => {
                setFuelTypes(data)
            },
            (error) => {
                window.alert(error)
            })
    }

    const getVehicleManufactersList = async() => {
        const data = await VehicleManufacterGestor.ListAll()
        const list = data.map((e)=> {
            if (e.ManufacterId === undefined) throw("Error no se puede cargar valores undefined en React Select de fabricantes de vehículo.")
            return ({
                value: e.ManufacterId,
                label: e.Description
            })
        })
        if (list === undefined) throw ("Error opciones de fabricantes vacias")
        return list
    }

    const getVehicleYearsList = async (LineId: number) => {
        const list = await VehicleYearGestor.List(LineId)
        const selectOption = list.map((e)=> {
            if (e.YearId === undefined) throw("Error no se puede cargar valores undefined en React Select de fabricantes de vehículo.")
            return ({
                value: e.YearId,
                label: e.Year
            })
        })
        if (selectOption === undefined) throw ("Error opciones de fabricantes vacias")
        return selectOption
    }

    const getVehicleLinesList = async (ManufacterId: number) => {
        const list = await VehicleLineGestor.List(ManufacterId)
        const selectOption = list.map((e)=> {
            if (e.LineId === undefined) throw("Error no se puede cargar valores undefined en React Select de fabricantes de vehículo.")
            return ({
                value: e.LineId,
                label: e.Description
            })
        })
        if (selectOption === undefined) throw ("Error opciones de fabricantes vacias")
        return selectOption
                    
    }

    const getVehicleEnginesList = async (YearId: number) => {
        const list = await VehicleEngineGestor.List(YearId)
        const selectOption = list.map((e)=> {
            if (e.EngineId === undefined) throw("Error no se puede cargar valores undefined en React Select de fabricantes de vehículo.")
            return ({
                value: e.EngineId,
                label: e.Description
            })
        })
        if (selectOption === undefined) throw ("Error opciones de fabricantes vacias")
        return selectOption    
    }

    const handleChangeManufacter = (data: SelectOptionType) => {
        
        setValue('LineOption', emptySelect)
        setValue('YearOption', emptySelect)
        setValue('EngineOption', emptySelect)
        setVehicleLines([])
        setVehicleYears([])
        setVehicleEngines([])
        if (data !== emptySelect) {
            getVehicleLinesList(data.value)
                .then((data) => setVehicleLines(data))
                .catch((error) => window.alert(error))
        }
        return data 
    }

    const handleChangeLine = (data: SelectOptionType) => {
        setValue('YearOption', emptySelect)
        setValue('EngineOption', emptySelect)
        setVehicleYears([])
        setVehicleEngines([])
        if (data !== emptySelect) {
            getVehicleYearsList(data.value)
                .then((data) => setVehicleYears(data))
                .catch((error) => window.alert(error))
        }
        return data
    }

    const handleChangeYear = (data: SelectOptionType) => {
        setValue('EngineOption', emptySelect)
        setVehicleEngines([])
        if (data !== emptySelect) {
            getVehicleEnginesList(data.value)
                .then((data) => setVehicleEngines(data))
                .catch((error) => window.alert(error))
        }
        return data
    }

    const handleChangeEngine = (data: SelectOptionType) => {
        return data
    }

    const handleCreateManufacter = async (inputValue: string) => {

        const confirm = window.confirm(`Se va a crear una nueva marca de vehículo ${inputValue}, esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const upperValue = inputValue.toUpperCase()
                await VehicleManufacterGestor.Create(upperValue)
                const newList = await getVehicleManufactersList()
                setVehicleManufacters(newList)
                const newManufacter = newList.find((m) => m?.label === upperValue)
                if (newManufacter === undefined) throw(`No se encontró la nueva marca de vehículo ${inputValue}`)
                setValue("ManufacterOption", newManufacter)
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const handleCreateLine = async (inputValue: string) => {

        const confirm = window.confirm(`Se va a crear una nueva linea de vehículo ${inputValue}, esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const upperValue = inputValue.toUpperCase()
                const selectedManufacter = watch('ManufacterOption')
                if (selectedManufacter === emptySelect) throw("No es posible crear linea de vehículo sin una marca de vehículo seleccionada.") 
                await VehicleLineGestor.Create(selectedManufacter.value, upperValue)

                const newList = await getVehicleLinesList(selectedManufacter.value)
                setVehicleLines(newList)
                const newLine = newList.find((m) => m?.label === upperValue)
                if (newLine === undefined) throw(`No se encontró la nueva linea de vehículo ${inputValue}`)
                setValue("LineOption", newLine)
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const handleCreateYear = async (inputValue: string) => {

        const confirm = window.confirm(`Se va a crear un nuevo año de vehículo ${inputValue}, esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const selectedLine = watch("LineOption")
                if (selectedLine === emptySelect) throw("No es posible crear año de vehículo sin una línea de vehículo seleccionada.") 
                await VehicleYearGestor.Create(selectedLine.value , inputValue)
                const newList = await getVehicleYearsList(selectedLine.value)
                setVehicleYears(newList)
                const newYear = newList.find((m) => m?.label === inputValue)
                if (newYear === undefined) throw(`No se encontró el nuevo año de vehículo ${inputValue}`)
                setValue("YearOption", newYear)
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const handleCreateEngine = async (inputValue: string) => {

        const confirm = window.confirm(`Se va a crear un nuevo motor de vehículo ${inputValue}, esta seguro que desea continuar?`)
        if (confirm) {
            try {
                const selectedYear = watch("YearOption")
                if (selectedYear === emptySelect) throw("No es posible crear motor de vehículo sin una línea de vehículo seleccionada.") 
                await VehicleEngineGestor.Create(selectedYear.value , inputValue)
                const newList = await getVehicleEnginesList(selectedYear.value)
                setVehicleEngines(newList)
                const newYear = newList.find((m) => {
                    return String(m?.label.trim()) === String(inputValue.trim())
                } )
                if (newYear === undefined) throw(`No se encontró el nuevo motor de vehículo ${inputValue}`)
                setValue("EngineOption", newYear)
            } catch (error) {
                window.alert(error)
            }
            
        }
    }

    const loadUpdateVehicleToForm = () => {
        
        setValue('PlateType',vehicle.PlateType)
        setValue('FuelType',vehicle.FuelType)
        getVehicleManufactersList().then((data) => {
            setVehicleManufacters(data)
            const selectValue = data.find((e) => {
                return e?.value === vehicle.ManufacterId
            })
            if (selectValue === undefined) throw("No se encontro la marca del vehículo seleccionado")
            setValue("ManufacterOption", selectValue)
        })

        getVehicleLinesList(vehicle.ManufacterId)
            .then((data) => {
            setVehicleLines(data)
            const selectValue = data.find((e) => {
                return e?.value === vehicle.LineId
            })
            if (selectValue === undefined) throw("No se encontro la linea de vehículo seleccionado")
            setValue("LineOption", selectValue)
        })
        getVehicleYearsList(vehicle.LineId)
            .then((data) => {
                setVehicleYears(data)
                const selectValue = data.find((e) => {
                    return e?.value === vehicle.YearId
                })
                if (selectValue === undefined) throw("No se encontro el año del vehículo seleccionado")
                setValue("YearOption", selectValue)
            }
        )
        getVehicleEnginesList(vehicle.YearId)
            .then((data) => {
                setVehicleEngines(data)
                const selectValue = data.find((e) => {
                    return e?.value === vehicle.EngineId
                })
                if (selectValue === undefined) throw("No se encontro el motor del vehículo seleccionado")
                setValue("EngineOption", selectValue)
            }
        )
    }

    const loadCreateVehicleToForm = () => {
        reset(initialState)
        setValue('Plate', vehicle.Plate)
        setValue('FuelType', vehicle.FuelType)
        getVehicleManufactersList().then((data) => setVehicleManufacters(data))
        setVehicleLines([])
        setVehicleYears([])
        setVehicleEngines([])
    }

    const handleUndoChanges = () => {
        if (!exists) loadCreateVehicleToForm()
        if (exists) loadUpdateVehicleToForm()
    }

    const handleCancel = () => {
        handleUndoChanges()
        toggleModal()
    }

    const save = async () => {
        //Adaptamos los datos
        try {
            const { ManufacterOption, LineOption, YearOption, EngineOption, ...rest } = watch()
            if (ManufacterOption === emptySelect || LineOption === emptySelect || YearOption === emptySelect || EngineOption === emptySelect ) {
                throw("No es posible actualizar los datos sino se seleccionan todos los campos")
            }
            const vehicleData: Vehicle = {
                ManufacterId: ManufacterOption.value,
                LineId: LineOption.value,
                YearId: YearOption.value,
                EngineId: EngineOption.value,
                ...rest
            }
            let response
            if (isCreating) {
                response = await VehicleGestor.Create(vehicleData)
            }
            if (isUpdating) {
                response = await VehicleGestor.Update(vehicleData)
            }
            const newVehicle = await VehicleGestor.GetByPlate(vehicleData.Plate)
            change(newVehicle)
            setToExists()
            window.alert(response)
            OnSaveCallback(vehicleData)
            toggleModal()
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect( () => {
        reset()
        getVehiclePlateTypesList()
        getVehicleFuelTypesList()
        setValue('Plate',vehicle.Plate)
        if (!exists) loadCreateVehicleToForm()
        if (exists) loadUpdateVehicleToForm()
    // eslint-disable-next-line
    },[vehicle])

    //console.log(watch())
    //console.log(isCreating, isUpdating)
    return (
        <Modal isOpen={isModalVisible} toggle={handleCancel}>
        <ModalHeader toggle={handleCancel}>
            {isCreating && 'Crear '}
            {isUpdating && 'Modificar '}vehículo</ModalHeader>
        <ModalBody>
            <FormGroup>
                <Label>Placa</Label>
                <input className="form-control" {...register('Plate')} value={vehicle.Plate} disabled={true}/>
            </FormGroup>
            <FormGroup>
                <Label>Tipo de placa</Label>
                <Controller
                    control={control}
                    name = 'PlateType'
                    rules = {{required: {
                        value: true,
                        message: 'Tipo de placa requerido'
                        }
                    }}
                    render= { ({field}) => {

                    return (
                        <Input type="select" {...field}>
                            <option disabled value=''> Seleccione una opción </option>
                            {plateTypes.map((plateType) =>  <option value={plateType.Code} key={plateType.Code}>{plateType.Description}</option>)}
                        </Input>
                    )
                    }
                } />
                {
                    errors.PlateType?.message && <FormError error={errors.PlateType.message} />
                } 
            </FormGroup>
            <FormGroup>
                <Label>Tipo de combustible</Label>
                <Controller
                    control={control}
                    name = 'FuelType'
                    rules = {{required: {
                        value: true,
                        message: 'Tipo de combustible requerido'
                        }
                    }}
                    render= { ({field}) => {

                        return (
                            <Input type="select" {...field}>
                                <option disabled value=''> Seleccione una opción </option>
                                {fuelTypes.map((plateType) =>  <option value={plateType.Code} key={plateType.Code}>{plateType.Description}</option>)}
                            </Input>
                        )
                        }
                    } />
                {
                    errors.FuelType?.message && <FormError error={errors.FuelType.message} />
                } 
            </FormGroup>
            <FormGroup>
                <Label>Fabricante</Label>
                <Controller
                    control={control}
                    name = 'ManufacterOption'
                    rules = {{required: {
                        value: true,
                        message: 'Marca requerida'
                        }
                    }}
                    render= { ({field}) => <CreatableSelect {...field} 
                        
                        onChange={(data) => field.onChange(handleChangeManufacter(data))}
                        onCreateOption={handleCreateManufacter}
                        // eslint-disable-next-line
                        // @ts-ignore
                        options={vehicleManufacters}
                        isClearable={true}
                        />}
                    />
                {
                    errors.ManufacterOption?.message && <FormError error={errors.ManufacterOption.message} />
                } 
            </FormGroup>
            <FormGroup>
                <Label>Línea</Label>
                <Controller
                    control={control}
                    name = 'LineOption'
                    rules = {{required: {
                        value: true,
                        message: 'Linea requerida'
                        }

                    }}
                    render= { ({field}) => <CreatableSelect {...field} 
                        
                        onChange={(data) => field.onChange(handleChangeLine(data))}
                        onCreateOption={handleCreateLine}
                        
                        // eslint-disable-next-line
                        // @ts-ignore
                        options={vehicleLines}
                        isClearable={true}/>}
                    />
                {
                    errors.LineOption?.message && <FormError error={errors.LineOption.message} />
                } 
            </FormGroup>
            <FormGroup>
                <Label>Año</Label>
                <Controller
                    control={control}
                    name = 'YearOption'
                    rules = {{required: {
                        value: true,
                        message: 'Año requerido'
                        }

                    }}
                    render= { ({field}) => <CreatableSelect {...field} 
                        
                        onChange={(data) => field.onChange(handleChangeYear(data))} 
                        onCreateOption={handleCreateYear}
                        
                        // eslint-disable-next-line
                        // @ts-ignore
                        options={vehicleYears}
                        isClearable={true}/>}
                    />
                {
                    errors.YearOption?.message && <FormError error={errors.YearOption.message} />
                } 
            </FormGroup>
            <FormGroup>
                <Label>Motor</Label>
                <Controller
                    control={control}
                    name = 'EngineOption'
                    rules = {{required: {
                        value: true,
                        message: 'Motor requerido'
                        }

                    }}
                    render= { ({field}) => <CreatableSelect {...field} 
                        
                        onChange={(data) => field.onChange(handleChangeEngine(data))} 
                        onCreateOption={handleCreateEngine}
                        
                        // eslint-disable-next-line
                        // @ts-ignore
                        options={vehicleEngines}
                        isClearable={true}/>}
                    />
                {
                    errors.EngineOption?.message && <FormError error={errors.EngineOption.message} />
                }
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleUndoChanges}>
            Deshacer
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleSubmit(save)}>
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    )
}

export default VehiclesForm