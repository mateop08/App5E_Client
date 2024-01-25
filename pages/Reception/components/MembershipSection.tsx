import { useFormContext } from "react-hook-form"
import { FormGroup, Label, Alert, Button } from "reactstrap"
import VehicleMembershipGestor from '@/models/VehicleMemberships.model';
import { useReceptionContext } from "../context/ReceptionContext";
import { useAlert } from "@/hooks/useAlert.hooks";
import VehicleGestor from "@/models/Vehicles.model";
import { formValues } from "./ReceptionForm";
import FormError from "@/components/FormError";
import VehicleContactGestor from "@/models/VehicleContacts.model";

const MembershipSection = () => {

    const {membershipState: {isFoundMembership, foundMembership, notFoundMembership, membership, changeMembership, changeToEmpty},
            receptionMode: {isMembershipMode},
            selectVehicle,
            assignedContactsState: {changeAssignedContacts, foundAssignedContacts} } = useReceptionContext()
    const {vehicle } = selectVehicle
    const {isShownAlert, showAlert, hideAlert} = useAlert()
    const { reset, register, watch, setValue, trigger, formState: {errors}} = useFormContext<formValues>()

    const validateCardNumber = async () => {

        hideAlert()
        await trigger('CardNumber')
        const CardNumber = watch('CardNumber')
        if (CardNumber === null || CardNumber === 0) {
            throw("Ingrese el número de membresía.")
        }
        if (errors.CardNumber?.message) {
            changeToEmpty()
        }
        if (!errors.CardNumber?.message) {
            showAlert()
            try {
                const CardNumber = watch('CardNumber')
                const membership = await VehicleMembershipGestor.GetByCardNumber(Number(CardNumber))
                const searchVehicle = await VehicleGestor.GetByPlate(membership.Plate)
                const assignedContacts = await VehicleContactGestor.ListContactsByVehiclePlate(membership.Plate)
                setValue('Vehicle', searchVehicle)
                changeMembership(membership)
                selectVehicle.change(searchVehicle)
                changeAssignedContacts(assignedContacts)
                selectVehicle.setToExists()
                foundMembership()
                foundAssignedContacts()
                showAlert()
            } catch (error) {
                notFoundMembership
                selectVehicle.setToEmpty()
                changeToEmpty()
                reset()
                setValue('CardNumber',CardNumber)
            }
        }
    }

    return (
        <FormGroup>
            <Label style={{display: isMembershipMode ? 'block' : 'none'}}>Carnet</Label>
            <input className="form-control" {...register('CardNumber',
                {
                    required: {
                        value: true,
                        message: "Membresía requerida"
                    }
                }
                )} onBlur={validateCardNumber} name="CardNumber" style={{display: isMembershipMode ? 'block' : 'none'}} />
            {
                errors.CardNumber?.message && <FormError error={errors.CardNumber?.message} />
            }
            {
                isMembershipMode && 
                <><br />
                    <Button color='primary' onClick={validateCardNumber}>Validar membresía</Button>
                </>
            }
            {
            (isShownAlert && !errors.CardNumber?.message && isMembershipMode) && 
            <>
                <br /><br />
                <Alert color={isFoundMembership ? (membership.Active ? 'success' : 'warning') : 'danger'}>
                    {isFoundMembership && 
                    <>
                        <Label>
                            {`Estado de membresía: ${membership.Active ? 'Activa' : 'Inactiva'}`}
                        </Label>
                        <br />
                        <Label>
                            {`Vehiculo: ${vehicle?.Description}`}
                        </Label>
                        <br />
                        <Label>
                            {`Tipo Placa: ${vehicle?.PlateType}`} 
                        </Label>
                    </>
                    }
                    {!isFoundMembership && 
                    <>
                        <Label>
                            {`Membresía no encontrada.`}
                        </Label>
                    </>
                    }
                </Alert>
            </>
            }
        </FormGroup>
    )
}

export default MembershipSection