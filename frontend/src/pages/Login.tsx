import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement login logic here (e.g., connect to backend for authentication)
        console.log('Logging in with:', email, password);
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
