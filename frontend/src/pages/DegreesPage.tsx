import React, { useEffect, useState } from 'react'

import UtilsServiceCreator from "../services/utils-service"
import Layout from '../Layout'

const DegreesPage = () => {

    const UtilsService = UtilsServiceCreator()

    const [degrees, setDegrees] = useState<string[]>([])
    const [newDegree, setNewDegree] = useState("")

    useEffect(() => {
        UtilsService.getAllDegrees()
            .then((res) => {
                console.log(res)
                setDegrees(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const addNewDegree = () => {
        UtilsService.createDegree(newDegree)
            .then((res) => {
                console.log(res)
                setDegrees([...degrees, newDegree])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteDegree = (degree: string) => {
        UtilsService.deleteDegree(degree)
            .then((res) => {
                console.log(res)
                setDegrees(degrees.filter((d) => d !== degree))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Layout>
            <div className='container col-md-8'>
                <h3>
                    All Degrees
                </h3>

                <div>
                    <input 
                        onChange={(e) => setNewDegree(e.target.value)}
                        value={newDegree} 
                        type="text" 
                        className="form-control" 
                        placeholder="Add New Degree" />
                    <button 
                        className="btn btn-primary my-3"
                        onClick={addNewDegree}
                        >
                            Add
                        </button>
                </div>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Degree</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {degrees.map((degree, index) => (
                            <tr key={index}>
                                <td>{degree}</td>
                                <td>
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteDegree(degree)}
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

export default DegreesPage