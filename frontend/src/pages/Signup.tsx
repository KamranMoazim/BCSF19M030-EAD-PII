import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const {registerQuery} = useAuth();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        // Implement signup logic here (e.g., connect to backend for user registration)
        console.log('Signing up with:', email, password, confirmPassword);

        if(password == confirmPassword){
            registerQuery({
                email,
                password
            })
                .then((res) => {
                    navigate("/login")
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            // toast
        }
    };




    return (
        <div className="container mt-4">
            <h1>Signup</h1>
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
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSignup}>Signup</button>
            </form>
        </div>
    );
};

export default Signup;
