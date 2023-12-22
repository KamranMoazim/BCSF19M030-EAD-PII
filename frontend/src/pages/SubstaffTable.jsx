import React from 'react';

const SubstaffTable = ({ substaffList, onDelete, onEdit }) => {
    return (
        <div className="container mt-4">
            <h1>Substaff Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {substaffList.map((substaff, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{substaff.fullName}</td>
                            <td>{substaff.email}</td>
                            <td>{substaff.phoneNumber}</td>
                            <td>{substaff.department}</td>
                            <td>{substaff.role}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => onEdit(substaff)}>Edit</button>
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => onDelete(substaff)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubstaffTable;
