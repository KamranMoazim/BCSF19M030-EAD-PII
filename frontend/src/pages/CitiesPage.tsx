import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UtilsServiceCreator from "../services/utils-service";
import Layout from '../Layout';
import { FaCity } from 'react-icons/fa';

const CitiesPage = () => {
    const UtilsService = UtilsServiceCreator();

    const [Cities, setCities] = useState<string[]>([]);
    const [newCity, setNewCity] = useState("");

    useEffect(() => {
        UtilsService.getAllCities()
            .then((res) => {
                console.log(res);
                setCities(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addNewCity = () => {
        if (!newCity.trim()) {
            toast.error('Please enter a valid city name');
            return;
        }

        UtilsService.createCity(newCity)
            .then((res) => {
                console.log(res);
                setCities([...Cities, newCity]);
                setNewCity("");
                toast.success('City added successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to add city. Please try again.');
            });
    };

    const deleteCity = (city: string) => {
        UtilsService.deleteCity(city)
            .then((res) => {
                console.log(res);
                setCities(Cities.filter((d) => d !== city));
                toast.success('City deleted successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to delete city. Please try again.');
            });
    };

    return (
        <Layout>
            <div className='container col-md-8 mt-4'>
                <h1>All Cities<FaCity className="ms-2" /></h1>

                <div className="mb-3">
                    <input
                        onChange={(e) => setNewCity(e.target.value)}
                        value={newCity}
                        type="text"
                        className="form-control"
                        placeholder="Add New City"
                    />
                    <button
                        className="btn btn-primary mt-2"
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
            {/* Toast Container for notifications */}
            <ToastContainer closeButton />
        </Layout>
    );
};

export default CitiesPage;
