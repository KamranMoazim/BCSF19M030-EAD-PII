import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../state-management/auth/authStore';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
    const authStore = useAuthStore();
    const { loginQuery } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('kamran@example.com');
    const [password, setPassword] = useState('12345678');

    const handleLogin = () => {
        // Implement login logic here (e.g., connect to backend for authentication)
        console.log('Logging in with:', email, password);

        // Basic validations
        if (!email.trim()) {
            toast.error('Email is required');
            return;
        }

        if (!password.trim()) {
            toast.error('Password is required');
            return;
        }

        // If validations pass, proceed with login
        loginQuery({
            email,
            password
        })
            .then((res) => {
                authStore.login(res);
                // Show success toast
                toast.success('Login successful!', { position: toast.POSITION.BOTTOM_RIGHT });
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                // Show error toast
                toast.error('Login failed. Please try again.', { position: toast.POSITION.TOP_CENTER });
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card mt-4 p-4">
                <h1 className="text-center mb-4"> <FaSignInAlt className="me-2" /> Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary mt-3 me-2" onClick={handleLogin}>
                        Login
                    </button>
                    <button type="button" className="btn btn-primary mt-3" onClick={() => navigate("/signup")}>
                        Signup Here
                    </button>
                </form>
            </div>
            {/* Toast Container for notifications */}
            <ToastContainer closeButton />
        </div>
    );
};

export default Login;
