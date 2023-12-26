import {createBrowserRouter} from "react-router-dom"

import DashboardPage from "../pages/DashboardPage"
import StudentPage from "../pages/StudentPage";
import AddUpdateStudentForm from "../pages/AddUpdateStudentForm";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import DegreesPage from "../pages/DegreesPage";
import CitiesPage from "../pages/CitiesPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import StaffPage from "../pages/StaffPage";
import StudentTable from "../pages/StudentTable";
import { USER_ROLES } from "../constants/constants";



const router = createBrowserRouter([

    {path:"/login", element:<Login />},
    {path:"/signup", element:<Signup />},


    {
        // element: <PrivateRoutes allowedRoles={["STUDENT", "SUB_ADMIN", "ADMIN"]} />,
        element: <PrivateRoutes allowedRoles={[USER_ROLES.STUDENT, USER_ROLES.SUB_ADMIN, USER_ROLES.ADMIN]} />,
        children: [
            {path:"/", element:<DashboardPage />, errorElement:<ErrorPage />},
        ]
    },

    {
        // element: <PrivateRoutes allowedRoles={["SUB_ADMIN", "ADMIN"]} />,
        element: <PrivateRoutes allowedRoles={[USER_ROLES.SUB_ADMIN, USER_ROLES.ADMIN]} />,
        children: [
            {
                path:"/students/", 
                element:<StudentPage />,
                children: [
                    {path:"", element:<StudentTable />},
                    {path:":id", element:<AddUpdateStudentForm />},
                ]
            },

            {path:"/degrees", element:<DegreesPage /> },
            {path:"/cities", element:<CitiesPage />},
            {path:"/departments", element:<DepartmentsPage />},
        ]
    },

    {
        // element: <PrivateRoutes allowedRoles={["ADMIN"]} />,
        element: <PrivateRoutes allowedRoles={[USER_ROLES.ADMIN]} />,
        children: [
            {path:"/staff", element:<StaffPage />},
        ]
    }

]);

export default router