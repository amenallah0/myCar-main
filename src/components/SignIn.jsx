import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from '../services/apiUserServices';
import { GoogleLogin } from 'react-google-login';
import { useUser } from '../contexts/userContext';

function SignIn() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ... existing code ...

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8081/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const userData = await response.json();

        if (response.ok) {
            if (login) {
                login(userData);
                toast.success('Connexion réussie!');
                
                // Vérifier si l'utilisateur est un admin
                if (userData.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/profile/' + userData.username);
                }
            } else {
                console.error('Login function is not defined');
                toast.error('Erreur de configuration');
            }
        } else {
            // Utiliser le message d'erreur du serveur si disponible
            const errorMessage = userData.message || 'Échec de la connexion. Vérifiez vos identifiants.';
            toast.error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error('Erreur de connexion au serveur');
    }
};


    const responseGoogle = async (response) => {
        try {
            const { email } = response.profileObj;
            await ApiService.signInUser(email, ''); // No password for Google login
            toast.success('Sign in successful!');
            setEmail('');
            setPassword('');
            login(response);
            localStorage.setItem('user', JSON.stringify(response)); // Store user data in local storage
            navigate('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    
    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign In</h2>
                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Sign In</button>
                                </div>
                            </form>
                            <div className="form-group text-center">
                                <p>Don't have an account? <Link to="/SignUp"><button className="btn btn-link" style={{color: 'red', background: 'none', border: 'none', outline: 'none', cursor: 'pointer'}}>Sign Up</button></Link></p>
                            </div>
                            <div className="form-group text-center">
                                <GoogleLogin
                                    clientId="YOUR_GOOGLE_CLIENT_ID"
                                    buttonText="Sign In with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignIn;
