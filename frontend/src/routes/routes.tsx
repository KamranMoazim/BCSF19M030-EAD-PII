import {createBrowserRouter} from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import StudentPage from "../pages/StudentPage";
import AddUpdateStudentForm from "../pages/AddUpdateStudentForm";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import DegreesPage from "../pages/DegreesPage";
import CitiesPage from "./CitiesPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import StaffPage from "../pages/StaffPage";
import StudentTable from "../pages/StudentTable";



const router = createBrowserRouter([

    {path:"/login", element:<Login />},
    {path:"/signup", element:<Signup />},


    {
        element: <PrivateRoutes allowedRoles={["STUDENT", "SUB_ADMIN", "ADMIN"]} />,
        children: [
            {path:"/", element:<Dashboard />, errorElement:<ErrorPage />},
        ]
    },

    {
        element: <PrivateRoutes allowedRoles={["SUB_ADMIN", "ADMIN"]} />,
        children: [
            {
                path:"/students/", 
                element:<StudentPage />,
                children: [
                    {path:"", element:<StudentTable />},
                    {path:":id", element:<AddUpdateStudentForm />},
                ]
            },

            // {path:"/degrees", element:<Degree />},
            {path:"/degrees", element:<DegreesPage /> },
            {path:"/cities", element:<CitiesPage />},
            {path:"/departments", element:<DepartmentsPage />},
        ]
    },

    {
        element: <PrivateRoutes allowedRoles={["ADMIN"]} />,
        children: [
            {path:"/staff", element:<StaffPage />},
        ]
    }

]);

export default router