import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaUsers } from 'react-icons/fa';

import Layout from '../Layout'
import { AdminViewUser, NewUser } from '../types/Auth';
import AuthServiceCreator from "../services/auth-service"

const initialData: AdminViewUser[] = [
    {
        id: 1,
        email: "tests",
        password: "eqweqwljdkslkasjd.dasdajskdhajksdasd.asdsadasdsd",
        role: "ADMIN",
        isDeleted: false,
        createdBy: "createdBy",
        createdOn: new Date(),
        modifiedBy: "modifiedBy",
        modifiedOn: new Date()
    },
];


const StaffPage = () => {

    const AuthService = AuthServiceCreator()

    const [data, setData] = useState(initialData);

    const [singleUser, setSingleUser] = useState<NewUser>({
        password: "",
        email: "",
        role: ""
    } as NewUser)

    

    const [isUpdate, setIsUpdate] = useState(false);
    const [userId, setUserId] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    const [searchString, setSearchString] = useState("");


    useEffect(() => {
        fetchData(
            searchString,
            pageNumber
        );
    }, []);


    const fetchData = async (searchString: string, pageNumber: number) => {
        const { source, numberOfPages, numberOfRows } = await AuthService.getAllWithQuery({
            OrderBy: "email",
            OrderDirection: 1,
            PageNumber: pageNumber,
            PageSize: 10,
            SearchString: searchString
        });
        setData(source);
        setTotalNumberOfPages(numberOfPages)
        console.log("first")
    };


    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
    ];


    const handleFirstPage = () => {
        setPageNumber(1)
        fetchData(
            searchString,
            pageNumber
        );
    };

    const handlePreviousPage = () => {
        setPageNumber(pageNumber - 1)
        fetchData(
            searchString,
            pageNumber
        );
    };

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
        fetchData(
            searchString,
            pageNumber
        );
    };

    const handleLastPage = () => {
        setPageNumber(totalNumberOfPages)
        fetchData(
            searchString,
            pageNumber
        );
    };



    const handleView = (id: number) => {
        console.log(`View clicked for ID: ${id}`);
        setUserId(id);
        setIsUpdate(true)
    };

    const handleRoleEdit = (role:string) => {
        AuthService.updateUserRole(userId, {
            role
        })
        .then((res) => {
            setIsUpdate(false)
            fetchData(
                searchString,
                pageNumber
            );

            setSingleUser({
                password: "",
                email: "",
                role: ""
            })

            toast.success('Role updated successfully!');
        })
        .catch((er) => {
            console.log(er)
            toast.error('Failed to update Role. Please try again.');
        })
    };

    const resetPassword = () => {
        AuthService.updatePassword(userId)
        .then((res) => {
            setIsUpdate(false)
            fetchData(
                searchString,
                pageNumber
            );

            setSingleUser({
                password: "",
                email: "",
                role: ""
            })
            toast.success('Password reset successfully!');
        })
        .catch((er) => {
            console.log(er)
            toast.error('Failed to Reset Password. Please try again.');
        })
    };

    const handleDismiss = (id: number) => {
        AuthService.dismissUser(id)
            .then((res) => {
                console.log(res)

                fetchData(
                    searchString,
                    pageNumber
                );
                toast.success('User Dismissed successfully!');
            })
            .catch((er) => {
                console.log(er)
                toast.error('Failed to Dismiss User. Please try again.');
            })

    };

    const handleAdd = () => {

        if (!singleUser.email || !singleUser.password || !singleUser.role) {
            toast.error('Please fill in all fields.');
            return;
        }

        AuthService.createNewUser(singleUser)
            .then((res) => {
                console.log(res)

                fetchData(
                    searchString,
                    pageNumber
                );

                setSingleUser({
                    ...singleUser,
                    email: "",
                    password: ""
                })

                toast.success('User Added successfully!');
            })
            .catch((er) => {
                console.log(er)
                toast.error('Failed to Add New User. Please try again.');
            })


    };



    const roles = [
        "ADMIN",
        "SUB_ADMIN",
        "STUDENT"
    ]



    return (
        <Layout>
            {/* <button onClick={() => navigation("/students/")}>
                Students
            </button> */}
            <div className="container mt-4">
                <h1>Staff Mangement<FaUsers className="ms-2" /></h1>

                {isUpdate ? (
                <div className="col-md-12">

                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                placeholder={singleUser.email}
                                type="text" className="form-control" id="email" />
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select
                                value={singleUser.role}
                                onChange={(e) => setSingleUser({ ...singleUser, role: e.target.value })}
                                className="form-control" id="role">
                                {roles.map((role, index) => (<option value={role} key={index}>{role}</option>))}
                            </select>
                        </div>
                    </div>

                    <button
                        className='btn btn-primary me-2'
                        onClick={() => resetPassword()}
                    >
                        Reset Password
                    </button>

                    <button
                        className='btn btn-primary'
                        onClick={() => handleRoleEdit(singleUser.role)}
                    >
                        Udpate Role
                    </button>

                </div>
                ) : (
                <div className="col-md-12">
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                value={singleUser.email}
                                onChange={(e) => setSingleUser({ ...singleUser, email: e.target.value })}
                                type="text" className="form-control" id="email" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                value={singleUser.password}
                                onChange={(e) => setSingleUser({ ...singleUser, password: e.target.value })}
                                type="text" className="form-control" id="password" />
                        </div>
                    </div>


                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select
                                value={singleUser.role}
                                onChange={(e) => setSingleUser({ ...singleUser, role: e.target.value })}
                                className="form-control" id="role">
                                {roles.map((role, index) => (<option value={role} key={index}>{role}</option>))}
                            </select>
                        </div>
                    </div>

                    <button
                        className='btn btn-primary'
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                </div>
                )}




                <div className='container mt-4'>

                    {/* Pagination Controls */}

                    <div className="mt-3">

                        <div className="col-md-21 my-3">
                            <div className="form-group">
                                <label htmlFor="searchHere">Search Here By Email:</label>
                                <input
                                    value={searchString}
                                    onChange={(e) => setSearchString(e.target.value)}
                                    type="text" className="form-control" id="searchHere" />
                            </div>
                        </div>

                        <button className='btn btn-success mb-2' onClick={() => fetchData(searchString,pageNumber)}>Search User</button>
                    </div>


                </div>

                <table className="table">
                    <thead>

                        <tr>
                            {columns.map((column) => (
                                <th key={column.key} >
                                    {column.label}
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-info me-2" onClick={() => {
                                        handleView(item.id)
                                        setSingleUser(item)
                                        }}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDismiss(item.id)}>
                                        Dismiss
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            <div className="d-flex align-items-center mt-3">
                <button className="btn btn-light me-2" onClick={handleFirstPage} disabled={pageNumber === 1}>
                    <FaAngleDoubleLeft />
                </button>
                <button className="btn btn-light me-2" onClick={handlePreviousPage} disabled={pageNumber === 1}>
                    <FaAngleLeft />
                </button>

                <button className="btn btn-light me-2" onClick={handleNextPage} disabled={pageNumber === totalNumberOfPages}>
                    <FaAngleRight />
                </button>
                <button className="btn btn-light" onClick={handleLastPage} disabled={pageNumber === totalNumberOfPages}>
                    <FaAngleDoubleRight />
                </button>
            </div>

            </div>

            <ToastContainer closeButton />
        </Layout>
    )
}

export default StaffPage