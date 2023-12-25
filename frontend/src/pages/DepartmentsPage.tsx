import React, { useEffect, useState } from 'react'

import UtilsServiceCreator from "../services/utils-service"
import Layout from '../Layout'

const DepartmentsPage = () => {

    const UtilsService = UtilsServiceCreator()

    const [Departments, setDepartments] = useState<string[]>([])
    const [newDepartment, setNewDepartment] = useState("")

    useEffect(() => {
        UtilsService.getAllDepartments()
            .then((res) => {
                console.log(res)
                setDepartments(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const addNewDepartment = () => {
        UtilsService.createDepartment(newDepartment)
            .then((res) => {
                console.log(res)
                setDepartments([...Departments, newDepartment])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteDepartment = (Department: string) => {
        UtilsService.deleteDepartment(Department)
            .then((res) => {
                console.log(res)
                setDepartments(Departments.filter((d) => d !== Department))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Layout>
            <div className='container col-md-8'>
                <h3>
                    All Departments
                </h3>

                <div>
                    <input 
                        onChange={(e) => setNewDepartment(e.target.value)}
                        value={newDepartment} 
                        type="text" 
                        className="form-control" 
                        placeholder="Add New Department" />
                    <button 
                        className="btn btn-primary my-3"
                        onClick={addNewDepartment}
                        >
                            Add
                        </button>
                </div>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Department</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Departments.map((Department, index) => (
                            <tr key={index}>
                                <td>{Department}</td>
                                <td>
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteDepartment(Department)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Layout>
    )
}

export default DepartmentsPage