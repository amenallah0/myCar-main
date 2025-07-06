import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../contexts/userContext';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { signInUser } from '../services/apiUserServices';
import TokenService from '../services/TokenService';
import HeaderFive from './HeaderFive';
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(120deg, #f6f8fd 0%, #e9edf7 100%)',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif"
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '24px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    animation: 'fadeIn 0.5s ease-out'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '40px',
    textAlign: 'center'
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '30px'
  },
  input: {
    width: '100%',
    padding: '18px 18px 18px 50px',
    borderRadius: '16px',
    border: '2px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    color: '#2d3748',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    outline: 'none',
    '&::placeholder': {
      color: '#a0aec0'
    },
    '&:focus': {
      border: '2px solid #4299e1',
      backgroundColor: '#ffffff',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.1)'
    }
  },
  icon: {
    position: 'absolute',
    left: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#4a5568',
    fontSize: '20px'
  },
  button: {
    width: '100%',
    padding: '18px',
    borderRadius: '16px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  primaryButton: {
    background: 'linear-gradient(45deg, #4299e1, #667eea)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(66, 153, 225, 0.2)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(66, 153, 225, 0.3)'
    }
  },
  googleButton: {
    background: '#ffffff',
    color: '#2d3748',
    border: '2px solid #e2e8f0',
    '&:hover': {
      backgroundColor: '#f8fafc',
      borderColor: '#cbd5e0'
    }
  },
  signupText: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#4a5568'
  },
  signupLink: {
    color: '#4299e1',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#2b6cb0',
      textDecoration: 'underline'
    }
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
};

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await signInUser(email, password);
            console.log('Réponse du serveur:', response);

            if (response && response.tokens && response.user) {
                login(response);
                navigate('/', { replace: true });
            } else {
                throw new Error('Données de connexion invalides');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            setError(error.message || 'Erreur lors de la connexion');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/password/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: resetEmail })
            });

            if (response.ok) {
                toast.success('Un email de réinitialisation a été envoyé à votre adresse');
                setShowForgotPasswordModal(false);
                setResetEmail('');
            } else {
                const error = await response.json();
                toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors de l\'envoi de l\'email');
        }
    };

    return (
        <>
            <HeaderFive />
            <div style={{...styles.container, paddingTop: '100px'}}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Connexion</h1>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <FaEnvelope style={styles.icon} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <FaLock style={styles.icon} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <button
                                type="button"
                                onClick={() => setShowForgotPasswordModal(true)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#4299e1',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    padding: '0'
                                }}
                            >
                                Mot de passe oublié ?
                            </button>
                        </div>
                        <button 
                            type="submit" 
                            style={{...styles.button, ...styles.primaryButton}}
                        >
                            Se connecter
                        </button>
                        {/* <button 
                            type="button" 
                            style={{...styles.button, ...styles.googleButton}}
                            onClick={() => toast.info('Fonctionnalité Google en cours de développement')}
                        >
                            <FaGoogle /> Continuer avec Google
                        </button> */}
                    </form>
                    <div style={styles.signupText}>
                        Pas encore de compte ?{' '}
                        <Link to="/SignUp" style={styles.signupLink}>
                            S'inscrire
                        </Link>
                    </div>
                </div>
            </div>

            {showForgotPasswordModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '16px',
                        width: '90%',
                        maxWidth: '400px'
                    }}>
                        <h2 style={{
                            marginBottom: '20px',
                            color: '#2d3748',
                            fontSize: '1.5rem'
                        }}>Réinitialiser votre mot de passe</h2>
                        <form onSubmit={handleForgotPassword}>
                            <div style={{ marginBottom: '20px' }}>
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '16px'
                                    }}
                                    required
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPasswordModal(false)}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        background: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        background: '#4299e1',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default SignIn;
