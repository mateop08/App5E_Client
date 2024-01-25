import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '@/App.css';
import store from '@/redux/store';
import Main from '@/pages/Main/Main';
import Container from '@/pages/Container';
import Login from '@/pages/Login/Login';
import Reception from '@/pages/Reception/Reception';
import Error from '@/pages/Error/Error';
import AnnotationTypesPage  from '@/pages/AnnotationTypes/AnnotationTypes.page';
import DocumentTypesPage from './pages/DocumentTypes/DocumentTypes.page';
import GroupsPage from './pages/Groups/Groups.page';
import AppDocumentsPage from './pages/AppDocuments/AppDocuments.page';
import TechniciansPage from './pages/Technicians/Technicians.page';
import OrderStatesPage from './pages/OrderStates/OrderStates.page';
import VehiclePlateTypesPage from './pages/VehiclePlateTypes/VehiclePlateTypes.page';
import UsersPage from './pages/Users/Users.page';
import GroupAppFunctionsPage from './pages/GroupsAppFunctions/GroupsAppFunctions.page';
import UserAppDocumentsPage from './pages/UserAppDocuments/UserAppDocuments.page';
import UserGroupsPage from './pages/UserAssignedGroups/UserAssignedGroups.page';
import OrderPage from './pages/Order/OrderPage';
import OrderProductsServicesPage from './pages/OrderProductsServices/OrderProductsServicesPage';
import OrderDocumentsPage from './pages/OrderDocuments/OrderDocumentsPage';
import OrderAnnotationsPage from './pages/OrderAnnotations/OrderAnnotationsPage';
import OrderReceptionDataPage from './pages/OrderReceptionData/OrderReceptionDataPage';
import BulkProductGestion from './pages/BulkProductGestion/BulkProductGestion';
import VehicleFuelTypesPage from './pages/VehicleFuelTypes/VehicleFuelTypes.page';
import InvoicePage from './pages/Invoice/InvoicePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        element: <Main />
      },
      {
        path:'/order/:OrderDocument/:OrderNumber',
        element: <OrderPage />,
        children: [
          {
            path:'/order/:OrderDocument/:OrderNumber/productsservices',
            element: <OrderProductsServicesPage />
          },
          {
            path:'/order/:OrderDocument/:OrderNumber/documents',
            element: <OrderDocumentsPage />
          },
          {
            path:'/order/:OrderDocument/:OrderNumber/annotations',
            element: <OrderAnnotationsPage />
          },
          {
            path:'/order/:OrderDocument/:OrderNumber/receptiondata',
            element: <OrderReceptionDataPage />
          }
        ]
      },
      {
        path: '/reception',
        element: <Reception />
      },
      {
        path: '/configuration/annotationtypes',
        element: <AnnotationTypesPage />
      },
      {
        path: '/configuration/documenttypes',
        element: <DocumentTypesPage />
      },
      {
        path: '/configuration/groups',
        element: <GroupsPage />
      },
      {
        path: '/configuration/appdocuments',
        element: <AppDocumentsPage />
      },
      {
        path: '/configuration/technicians',
        element: <TechniciansPage />
      },
      {
        path: '/configuration/orderstates',
        element: <OrderStatesPage />
      },
      {
        path: '/configuration/vehicleplatetypes',
        element: <VehiclePlateTypesPage />
      },
      {
        path: '/configuration/vehiclefueltypes',
        element: <VehicleFuelTypesPage />
      },
      {
        path: '/configuration/users',
        element: <UsersPage />
      },
      {
        path: '/configuration/groupsappfunctions/:code',
        element: <GroupAppFunctionsPage />
      },
      {
        path: '/configuration/userappdocuments/:code',
        element: <UserAppDocumentsPage />
      },
      {
        path: '/configuration/userassignedgroups/:code',
        element: <UserGroupsPage />
      },
      {
        path: '/bulkproductgestion/',
        element: <BulkProductGestion />
      },
      {
        path: '/invoice/',
        element: <InvoicePage />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

const App = () => {

  return(
    <Provider store ={store}>
        <RouterProvider router={router} />
    </Provider>
  );

}
  
export default App;