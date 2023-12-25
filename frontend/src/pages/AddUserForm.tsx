import React, { useState } from 'react';

const AddUserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); // Added role state

    const handleSubmit = () => {
        // Implement logic to submit data (e.g., connect to backend API)
        console.log('Submitting data:', { email, password, role });
    };

    return (
        <div className="container mt-4">
            <h1>Add New User</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        <option value="Student">Student</option>
                    </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default AddUserForm;
