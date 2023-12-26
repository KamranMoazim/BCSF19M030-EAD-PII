import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UtilsServiceCreator from "../services/utils-service";
import Layout from '../Layout';
import { FaGraduationCap } from 'react-icons/fa';

const DegreesPage = () => {
    const UtilsService = UtilsServiceCreator();

    const [degrees, setDegrees] = useState<string[]>([]);
    const [newDegree, setNewDegree] = useState("");

    useEffect(() => {
        UtilsService.getAllDegrees()
            .then((res) => {
                console.log(res);
                setDegrees(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addNewDegree = () => {
        if (!newDegree.trim()) {
            toast.error('Please enter a valid degree name');
            return;
        }

        UtilsService.createDegree(newDegree)
            .then((res) => {
                console.log(res);
                setDegrees([...degrees, newDegree]);
                setNewDegree("");
                toast.success('Degree added successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to add degree. Please try again.');
            });
    };

    const deleteDegree = (degree: string) => {
        UtilsService.deleteDegree(degree)
            .then((res) => {
                console.log(res);
                setDegrees(degrees.filter((d) => d !== degree));
                toast.success('Degree deleted successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to delete degree. Please try again.');
            });
    };

    return (
        <Layout>
            <div className='container col-md-8 mt-4'>
                <h1>All Degrees<FaGraduationCap className="ms-2" /></h1>

                <div className="mb-3">
                    <input
                        onChange={(e) => setNewDegree(e.target.value)}
                        value={newDegree}
                        type="text"
                        className="form-control"
                        placeholder="Add New Degree"
                    />
                    <button
                        className="btn btn-primary mt-2"
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
            {/* Toast Container for notifications */}
            <ToastContainer closeButton />
        </Layout>
    );
};

export default DegreesPage;
