import React, { useState } from 'react';
import { useUser } from '../contexts/userContext';
import ApiService from '../services/apiUserServices';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.signInUser(email, password);
      const { token, user } = response;
      login(user, token);
      // Rediriger vers la page d'accueil ou le dashboard
    } catch (error) {
      console.error('Login failed:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;