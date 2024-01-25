import { FormGroup, Label, Button, Alert } from "reactstrap"
import FormError from "@/components/FormError"
import VehiclesForm from "@/components/VehicleForm";
import VehicleGestor from '@/models/Vehicles.model';
import useModal from "@/hooks/useModal.hook";
import useCrud from "@/hooks/useCrud.hook";
import { useReceptionContext } from "../context/ReceptionContext";
import { useFormContext } from "react-hook-form";
import { formValues } from "./ReceptionForm";
import { useAlert } from "@/hooks/useAlert.hooks";
import VehicleContactGestor from "@/models/VehicleContacts.model";
import ContactGestor from "@/models/Contacts.model";
import UpperCaseInputControl from "@/components/UpperCaseInputControl";
import { KeyboardEvent } from "react";

const VehicleSection = () => {

    const { selectVehicle, assignedContactsState, 
        receptionMode: {isPlateMode, isMembershipMode} } = useReceptionContext()

    const {vehicle, change, setToEmpty, setToNotExists, exists, setToExists} = selectVehicle

    const {changeAssignedContacts, foundAssignedContacts, notFoundAssignedContacts} = assignedContactsState

    const { setValue, watch, trigger, formState: {errors}, control, setFocus} = useFormContext<formValues>()
    const {isShownAlert, hideAlert, showAlert} = useAlert()

    const vehiclesModal = useModal()
    const vehicleCrud = useCrud()

    const searchContacsByPlate = (Plate: string) => {
        VehicleContactGestor.ListContactsByVehiclePlate(Plate)
            .then((data)=> {
                changeAssignedContacts(data)
                if (data.length >= 1) { foundAssignedContacts() } 
                else { notFoundAssignedContacts() }
                
            }, (error) => console.log(error))
    }

    const searchVehicleByPlate = async () => {
        hideAlert()
        setToNotExists()
        notFoundAssignedContacts()
        const Plate = watch('Vehicle.Plate')
        const emptyContact = ContactGestor.Construct('','','','','')
        setValue('Contact',emptyContact)
        await trigger('Vehicle.Plate')

        if (errors.Vehicle?.Plate) {
            hideAlert()
            setToEmpty()
            assignedContactsState.changeToEmpty()
            notFoundAssignedContacts()
            return
            
        }
        if (!errors.Vehicle?.Plate) {
            showAlert()
            try {
                const searchVehicle = await VehicleGestor.GetByPlate(Plate)
                setToExists()
                change(searchVehicle)
                searchContacsByPlate(Plate)
            } catch (error) {
                const partialVehicle = VehicleGestor.Construct(Plate,'',0,0,0,0,'')
                change(partialVehicle)
                setToNotExists()
                assignedContactsState.changeToEmpty()
                notFoundAssignedContacts()
            }
        }
    }

    const handleKeyDownForVehiclePlate = async (event: KeyboardEvent) => {

        if (event.key === 'Enter') {
            await searchVehicleByPlate()
            if (!errors.Vehicle?.Plate) {
                setFocus("Mileage")
            }
        }

    }

    const handleCreateVehicle = () => {
        vehiclesModal.toggleModal()
        vehicleCrud.setToCreate()
    }

    const handleEditVehicle = () => {
        vehiclesModal.toggleModal()
        vehicleCrud.setToUpdate()
    }

    return (
        <>
        <legend>Información de vehículo</legend>
        <FormGroup>
            <Label>Placa</Label>
            <UpperCaseInputControl 
                control={control} 
                name="Vehicle.Plate" 
                maxLength={6} 
                disabled={isMembershipMode}
                onBlur={searchVehicleByPlate}
                onKeyDown={handleKeyDownForVehiclePlate}
                rules={
                    {required: {
                        value: true,
                        message: "Placa requerida"
                    },
                    pattern: {
                        value: /[A-Z]{3}[0-9]{3}/,
                        message: "Placa inválida"
                    }}
                }
            />
            {
                errors.Vehicle?.Plate?.message && <FormError error={errors.Vehicle?.Plate?.message} />
            }
            {
                isPlateMode && 
                <>
                    <br />
                    <Button color='primary' onClick={searchVehicleByPlate}>Buscar vehículo</Button>
                </>
            }
            {(isShownAlert && !errors.Vehicle?.Plate?.message && isPlateMode) &&
            <>
                <br /><br />
                <Alert color={exists ? 'success' : 'danger'}>
                    {exists && 
                    <>
                        <Label>
                            {`Vehiculo: ${vehicle?.Description} (${vehicle?.FuelType})`}
                        </Label>
                        <br />
                        <Label>
                            {`Tipo Placa: ${vehicle?.PlateType}`} 
                        </Label>
                        <br />
                        <Button onClick={handleEditVehicle}>Modificar</Button>
                    </>
                    }
                    {!exists && 
                    <>
                        <Label>
                            {`Vehiculo NO encontrado.`}
                        </Label>
                        <br />
                        <Button onClick={handleCreateVehicle}>Crear</Button>
                    </>
                    }
                </Alert>
            </>
            }
            <VehiclesForm Crud={vehicleCrud} 
                    ModalGestor={vehiclesModal}
                    SelectVehicle={selectVehicle}
                    OnSaveCallback={() => {}} />
           
        </FormGroup>
        </>
    )
}

export default VehicleSection