import { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // ⬅️ Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token, role } = await loginUser(username, password);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'verifier') {
        navigate('/verifier');
      } else {
        alert('Unknown role');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div id="login-container" className="login-container">
      <div id="login-card" className="login-card">
        <h2 id="login-heading" className="login-heading">Welcome Back</h2>
        <p id="login-subheading" className="login-subheading">Please log in to continue</p>

        <input
          id="username-input"
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          id="password-input"
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          id="login-button"
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
