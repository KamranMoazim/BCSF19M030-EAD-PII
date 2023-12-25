import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { AdminViewUser, NewUser } from '../types/Auth';
import { useNavigate } from 'react-router-dom';

import AuthServiceCreator from "../services/auth-service"

const initialData: AdminViewUser[] = [
    {
        id: 1,
        email: "tets",
        password: "fsdfjlk",
        role: "tests",
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


    const naviagtion = useNavigate()


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
        })
        .catch((er) => {
            console.log(er)
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
        })
        .catch((er) => {
            console.log(er)
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
            })
            .catch((er) => {
                console.log(er)
            })

    };

    const handleClick = () => {

        if(isUpdate){



        } else {
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
                })
                .catch((er) => {
                    console.log(er)
                })
        }


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
                <h1>Staff Mangement</h1>

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
                        onClick={handleClick}
                    >
                        {"Add"}
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

                <button className="btn btn-primary me-2" onClick={handleFirstPage} disabled={pageNumber === 1}>
                    &lt;&lt;
                </button>
                <button className="btn btn-primary me-2" onClick={handlePreviousPage} disabled={pageNumber === 1}>
                    &lt;
                </button>

                <button className="btn btn-primary me-2" onClick={handleNextPage} disabled={pageNumber === totalNumberOfPages}>
                    &gt;
                </button>
                <button className="btn btn-primary" onClick={handleLastPage} disabled={pageNumber === totalNumberOfPages}>
                    &gt;&gt;
                </button>

            </div>
        </Layout>
    )
}

export default StaffPage