import React, { useEffect, useState } from 'react'

import UtilsServiceCreator from "../services/utils-service"
import Layout from '../Layout'

const CitiesPage = () => {

    const UtilsService = UtilsServiceCreator()

    const [Cities, setCities] = useState<string[]>([])
    const [newCity, setNewCity] = useState("")

    useEffect(() => {
        UtilsService.getAllCities()
            .then((res) => {
                console.log(res)
                setCities(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const addNewCity = () => {
        UtilsService.createCity(newCity)
            .then((res) => {
                console.log(res)
                setCities([...Cities, newCity])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteCity = (city: string) => {
        UtilsService.deleteCity(city)
            .then((res) => {
                console.log(res)
                setCities(Cities.filter((d) => d !== city))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Layout>
            <div className='container col-md-8'>
                <h3>
                    All Cities
                </h3>

                <div>
                    <input 
                        onChange={(e) => setNewCity(e.target.value)}
                        value={newCity} 
                        type="text" 
                        className="form-control" 
                        placeholder="Add New City" />
                    <button 
                        className="btn btn-primary my-3"
                        onClick={addNewCity}
                        >
                            Add
                        </button>
                </div>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">City</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cities.map((City, index) => (
                            <tr key={index}>
                                <td>{City}</td>
                                <td>
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteCity(City)}
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

export default CitiesPage