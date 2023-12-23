import React, { useState } from 'react';
import useAuthStore from '../state-management/auth/authStore';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const authStore = useAuthStore();
    const {loginQuery} = useAuth();
    const navigate = useNavigate()

    const [email, setEmail] = useState('kamran@example.com');
    const [password, setPassword] = useState('12345678');

    const handleLogin = () => {
        // Implement login logic here (e.g., connect to backend for authentication)
        console.log('Logging in with:', email, password);

        loginQuery({
            email,
            password
        })
            .then((res) => {
                // console.log(res)
                authStore.login(res)
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })

    };

    return (
        <div className="container mt-4">
            <h1>Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;
