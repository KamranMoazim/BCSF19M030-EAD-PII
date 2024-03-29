import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UtilsServiceCreator from "../services/utils-service";
import Layout from '../Layout';
import { FaRegBuilding } from 'react-icons/fa';

const DepartmentsPage = () => {
    const UtilsService = UtilsServiceCreator();

    const [departments, setDepartments] = useState<string[]>([]);
    const [newDepartment, setNewDepartment] = useState("");

    useEffect(() => {
        UtilsService.getAllDepartments()
            .then((res) => {
                console.log(res);
                setDepartments(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addNewDepartment = () => {
        if (!newDepartment.trim()) {
            toast.error('Please enter a valid department name');
            return;
        }

        UtilsService.createDepartment(newDepartment)
            .then((res) => {
                console.log(res);
                setDepartments([...departments, newDepartment]);
                setNewDepartment("");
                toast.success('Department added successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to add department. Please try again.');
            });
    };

    const deleteDepartment = (department: string) => {
        UtilsService.deleteDepartment(department)
            .then((res) => {
                console.log(res);
                setDepartments(departments.filter((d) => d !== department));
                toast.success('Department deleted successfully!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Failed to delete department. Please try again.');
            });
    };

    return (
        <Layout>
            <div className='container col-md-8 mt-4'>
                <h1>All Departments<FaRegBuilding className="ms-2" /></h1>

                <div className="mb-3">
                    <input
                        onChange={(e) => setNewDepartment(e.target.value)}
                        value={newDepartment}
                        type="text"
                        className="form-control"
                        placeholder="Add New Department"
                    />
                    <button
                        className="btn btn-primary mt-2"
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
                        {departments.map((department, index) => (
                            <tr key={index}>
                                <td>{department}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteDepartment(department)}
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

export default DepartmentsPage;
