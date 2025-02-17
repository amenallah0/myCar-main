import React, { useState } from 'react';
import ApiService from '../services/apiUserServices';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await ApiService.signUp(username, email, password);
            toast.success('Sign up successful! Please log in.');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Failed to create user. Please try again.');
        }
    };

    const responseGoogle = async (response) => {
        try {
            const { name, email } = response.profileObj;
            await ApiService.signUp(name, email, ''); // No password for Google login
            toast.success('Sign up successful! Please log in.');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Failed to create user. Please try again.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Confirm</button>
                                </div>
                                <div className="form-group text-center">
                                    <p>You have an account? <Link to="/SignIn"><button className="btn btn-link" style={{color: 'red', background: 'none', border: 'none', outline: 'none', cursor: 'pointer'}}>Sign In</button></Link></p>
                                </div>
                                <div className="form-group text-center">
                                    <GoogleLogin
                                        clientId="YOUR_GOOGLE_CLIENT_ID"
                                        buttonText="Sign Up with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
