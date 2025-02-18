import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../contexts/userContext';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
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

function SignIn() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8081/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const userData = await response.json();

            if (response.ok) {
                login(userData);
                toast.success('Connexion réussie!');
                navigate(userData.role === 'ADMIN' ? '/admin' : `/profile/${userData.username}`);
            } else {
                toast.error(userData.message || 'Échec de la connexion. Vérifiez vos identifiants.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <FaEnvelope style={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
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
                            placeholder="Votre mot de passe"
                            value={formData.password}
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
                        ) : 'Se connecter'}
                    </button>
                    <button 
                        type="button" 
                        style={{...styles.button, ...styles.googleButton}}
                        onClick={() => toast.info('Fonctionnalité Google en cours de développement')}
                    >
                        <FaGoogle /> Continuer avec Google
                    </button>
                </form>
                <div style={styles.signupText}>
                    Pas encore de compte ?{' '}
                    <Link to="/SignUp" style={styles.signupLink}>
                        S'inscrire
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

export default SignIn;
