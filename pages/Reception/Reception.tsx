
//Components
import ReceptionForm from '@/pages/Reception/components/ReceptionForm';
import { useReceptionMode } from '@/pages/Reception/hooks/useReceptionMode';
import { ReceptionState, ReceptionContext } from '@/pages/Reception/context/ReceptionContext';
import { useMembership } from './hooks/useMembership';
import { useAssignedContacts } from './hooks/useAssignedContacts';
import { useSelectVehicle } from '@/hooks/useSelectVehicle.hooks';
import { useSelectContact } from '@/hooks/useSelectContact.hooks';

const Reception = () => {
    
    const receptionMode = useReceptionMode()
    const vehicleState = useSelectVehicle()
    const membershipState = useMembership()
    const assignedContacts = useAssignedContacts()
    const selectedContact = useSelectContact()

    const ReceptionFormState: ReceptionState = {
        receptionMode: receptionMode,
        selectVehicle: vehicleState,
        membershipState: membershipState,
        assignedContactsState: assignedContacts,
        selectedContactState: selectedContact
    }
    //Debugging context
    //console.log(assignedContacts.contacts)
    return (
        <ReceptionContext.Provider value={ReceptionFormState}>
            <h1>Recepción de vehículos</h1>
            <ReceptionForm />
        </ReceptionContext.Provider>
        
    );
}

export default Reception