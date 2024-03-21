// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/signup', { email, password });
      alert('Signup successful');
      fetchUsers(); // Fetch users again after signup
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
  };

  const handleLogin = async () => {
    // Login logic remains the same
  };

  return (
    <div>
      <h1>MERN Auth</h1>
      <div>
        <h2>Signup</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
      <div>
        <h2>Login</h2>
        {/* Login form remains the same */}
      </div>
      <div>
        <h2>All Signed-Up Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
