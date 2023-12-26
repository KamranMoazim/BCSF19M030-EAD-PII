import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const Signup = () => {
    const { registerQuery } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {

        

        // Reset previous error messages
        setError('');

        // Basic validations
        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!password.trim()) {
            setError('Password is required');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // If validations pass, proceed with signup
        registerQuery({ email, password })
            .then((res) => {
                // Show success toast
                toast.success('Signup successful!', { position: toast.POSITION.BOTTOM_RIGHT });
                // Navigate to login page
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
                setError('Signup failed. Please try again.'); // Display a generic error message
            });
    };



    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card mt-4 p-4">
                <h1 className="text-center mb-4"><FaUserPlus className="me-2" />Signup</h1>
                {error && <div className="alert alert-danger">{error}</div>}
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
                    <button type="button" className="btn btn-primary mt-3 me-2" onClick={handleSignup}>
                        Signup
                    </button>
                    <button type="button" className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
                        Login Here
                    </button>
                </form>
            </div>
            {/* Toast Container for notifications */}
            <ToastContainer closeButton />
        </div>
    );
};

export default Signup;
