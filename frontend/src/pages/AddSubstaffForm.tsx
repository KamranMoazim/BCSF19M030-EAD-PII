import React, { useState } from 'react';

const AddSubstaffForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Added role state

    const handleSubmit = () => {
        // Implement logic to submit data (e.g., connect to backend API)
        console.log('Submitting substaff data:', { fullName, email, phoneNumber, department, password, role });
    };

    return (
        <div className="container mt-4">
            <h1>Add New Substaff</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input type="text" className="form-control" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default AddSubstaffForm;
