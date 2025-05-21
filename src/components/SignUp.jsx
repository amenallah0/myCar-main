import React, { useState } from 'react';
import ApiUserService from '../services/apiUserServices';
import { Link } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

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
    marginBottom: '25px'
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
    outline: 'none'
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
    marginBottom: '20px'
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    '&:hover': {
      backgroundColor: '#f8fafc',
      borderColor: '#cbd5e0'
    }
  },
  signInText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#4a5568'
  },
  signInLink: {
    color: '#4299e1',
    textDecoration: 'none',
    fontWeight: '600',
    '&:hover': {
      color: '#2b6cb0',
      textDecoration: 'underline'
    }
  }
};

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        const { confirmPassword, ...userData } = formData;

        try {
            await ApiUserService.signUpUser(userData);
            toast.success('Inscription réussie ! Veuillez vous connecter.');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Échec de l\'inscription. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Inscription</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <FaUser style={styles.icon} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Nom d'utilisateur"
                            value={formData.username}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <FaEnvelope style={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <FaLock style={styles.icon} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <FaLock style={styles.icon} />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmer le mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{...styles.button, ...styles.primaryButton}}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        ) : 'S\'inscrire'}
                    </button>
                    <button 
                        type="button" 
                        style={{...styles.button, ...styles.googleButton}}
                        onClick={() => toast.info('Fonctionnalité Google en cours de développement')}
                    >
                        <FaGoogle /> Continuer avec Google
                    </button>
                </form>
                <div style={styles.signInText}>
                    Déjà inscrit ?{' '}
                    <Link to="/SignIn" style={styles.signInLink}>
                        Se connecter
                    </Link>
                </div>
            </div>
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
        </div>
    );
}

export default SignUp;
