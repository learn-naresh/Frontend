import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !passwordConfirmation) {
      console.error("Password fields cannot be blank.");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);  // Store token in local storage
        navigate('/');
      } else {
        console.error("Registration failed. Server responded with error:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
