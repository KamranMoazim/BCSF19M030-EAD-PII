import {createBrowserRouter} from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import StudentTable from "../pages/StudentTable";
import SubstaffTable from "../pages/SubstaffTable";
import Cities from "../pages/Cities";
import Degree from "../pages/Degree";
import StudentPage from "../pages/StudentPage";
import AddUpdateStudentForm from "../pages/AddUpdateStudentForm";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";



const router = createBrowserRouter([

    // {path:"/", element:<Dashboard />},
    // {path:"/students", element:<StudentPage />},
    // {path:"/students/:id", element:<AddUpdateStudentForm />},
    // {path:"/staff", element:<SubstaffTable />},
    // {path:"/cities", element:<Cities />},
    // {path:"/degrees", element:<Degree />},

    {path:"/login", element:<Login />},
    {path:"/signup", element:<Signup />},

    // {
    //     element: <PrivateRoutes allowedRoles={["Student", "SubAdmin", "Admin"]} />,
    //     children: [
    //         {path:"/", element:<Dashboard />, errorElement:<ErrorPage />},
    //         {path:"/degrees", element:<Degree />},
    //         {
    //             path:"/students/", 
    //             element:<StudentPage />,
    //             children: [
    //                 {path:"", element:<StudentTable />},
    //                 {path:":id", element:<AddUpdateStudentForm />},
    //             ]
    //         },
    //         {path:"/staff", element:<SubstaffTable />},
    //         {path:"/cities", element:<Cities />},
    //     ]
    // },

    {
        element: <PrivateRoutes allowedRoles={["Student", "SubAdmin", "Admin"]} />,
        children: [
            {path:"/", element:<Dashboard />, errorElement:<ErrorPage />},
        ]
    },

    {
        element: <PrivateRoutes allowedRoles={["SubAdmin", "Admin"]} />,
        children: [
            {path:"/degrees", element:<Degree />},
            {
                path:"/students/", 
                element:<StudentPage />,
                children: [
                    {path:"", element:<StudentTable />},
                    {path:":id", element:<AddUpdateStudentForm />},
                ]
            },
            {path:"/cities", element:<Cities />},
        ]
    },

    {
        element: <PrivateRoutes allowedRoles={["Admin"]} />,
        children: [
            {path:"/staff", element:<SubstaffTable />},
        ]
    }

]);

export default router