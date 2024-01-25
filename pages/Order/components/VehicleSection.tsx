import { Table, Button } from "reactstrap"
import { useOrderContext } from "../context/OrderContext"
import { BsPencilFill } from "react-icons/bs"
import { useFormContext } from "react-hook-form"
import { orderForm } from "./OrderForm"
import VehiclesForm from "@/components/VehicleForm"
import useModal from "@/hooks/useModal.hook"
import useCrud from "@/hooks/useCrud.hook"
import { useSelectVehicle } from "@/hooks/useSelectVehicle.hooks"
import { Vehicle } from "@/models/Vehicles.model"

const VehicleSection = () => {
    const { orderState: {order, change}, editingState } =  useOrderContext()
    const {Vehicle} = order
    const { register, setValue } = useFormContext<orderForm>()

    const vehicleForm = useModal()
    const Crud = useCrud()
    const SelectVehicle = useSelectVehicle()

    const onSaveForm = (vehicle: Vehicle) => {
        const newOrder = order
        newOrder.Vehicle = vehicle
        setValue('Vehicle',vehicle)
        change(newOrder)
    }

    const openVehicleForm = (event: React.MouseEvent<HTMLElement>) => {
        const option = event.currentTarget.getAttribute('name')
        //console.log(Vehicle)
        if (option === 'create') {
            Crud.setToCreate()
            SelectVehicle.setToNotExists()
            SelectVehicle.setToEmpty()
        }
        if (option === 'update') { 
            Crud.setToUpdate()
            SelectVehicle.setToExists()
            SelectVehicle.change(Vehicle) 
        }
        vehicleForm.toggleModal()
    }

    return (
        <>
            <VehiclesForm 
                ModalGestor={vehicleForm}
                Crud={Crud}
                SelectVehicle={SelectVehicle}
                OnSaveCallback={onSaveForm}/>

            <div className="table-responsive">
                <Table>
                <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Vehículo</th>
                            <th>Tipo Combustible</th>
                            <th>Kilometraje</th>
                            <th>Tipo Placa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!editingState.active &&
                            <tr>
                                <td>{Vehicle.Plate}</td>
                                <td>{Vehicle.Description}</td>
                                <td>{Vehicle.FuelType}</td>
                                <td>{order.Mileage}</td>
                                <td>{Vehicle.PlateType}</td>
                            </tr>
                        }
                        {editingState.active &&
                            <tr>
                                <td><input className="form-control" disabled={true} {...register('Vehicle.Plate')}/></td>
                                <td><input className="form-control" disabled={true} {...register('Vehicle.Description')}/></td>
                                <td><input className="form-control" disabled={true} {...register('Vehicle.FuelType')}/></td>
                                <td><input className="form-control"  {...register('Mileage', {valueAsNumber: true})}/></td>
                                <td><input className="form-control" disabled={true} {...register('Vehicle.PlateType')}/></td>
                            </tr>
                        }
                    </tbody>
                </Table>
                {editingState.active &&
                    <>
                        <Button color="warning" name='update' onClick={openVehicleForm}>
                            <BsPencilFill/> Editar
                        </Button>
                    </>
                }
                </div>
            </>
    )
}

export default VehicleSection