import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderFive from './HeaderFive';
import { useUser } from '../contexts/userContext';
import TokenService from '../services/TokenService';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useUser();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        if (token) {
            validateToken(token);
        }
    }, [location]);

    const validateToken = async (token) => {
        try {
            const response = await fetch(`http://localhost:8081/api/password/validate-token?token=${token}`);
            const data = await response.json();
            setIsValidToken(data.valid);
            if (!data.valid) {
                toast.error('Lien de réinitialisation invalide ou expiré');
                navigate('/signin');
            }
        } catch (error) {
            console.error('Erreur de validation du token:', error);
            toast.error('Erreur lors de la validation du lien');
            navigate('/signin');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = new URLSearchParams(location.search).get('token');

        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            // 1. Réinitialiser le mot de passe
            const resetResponse = await fetch('http://localhost:8081/api/password/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword: password
                })
            });

            const resetData = await resetResponse.json();

            if (resetResponse.ok && resetData.success) {
                // Stocker les tokens
                TokenService.setTokens(resetData.tokens);
                localStorage.setItem('user', JSON.stringify(resetData.user));

                // Mettre à jour le contexte utilisateur
                login({
                    user: resetData.user,
                    tokens: resetData.tokens
                });

                toast.success('Mot de passe réinitialisé avec succès');
                navigate('/');
            } else {
                toast.error(resetData.message || 'Erreur lors de la réinitialisation du mot de passe');
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors de la réinitialisation du mot de passe');
        }
    };

    return (
        <>
            <HeaderFive />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(120deg, #f6f8fd 0%, #e9edf7 100%)',
                padding: '20px',
                fontFamily: "'Poppins', sans-serif"
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '450px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '24px',
                    padding: '40px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        marginBottom: '30px',
                        textAlign: 'center'
                    }}>Réinitialiser votre mot de passe</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '16px'
                                }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <input
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '16px'
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '12px',
                                background: 'linear-gradient(45deg, #4299e1, #667eea)',
                                color: 'white',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Réinitialiser le mot de passe
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword; 