import React, { useState } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleInput = (event) => {
    setIdentifier(event.target.value); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    
    const payload = {
      username: identifier.includes("@") ? "" : identifier,
      email: identifier.includes("@") ? identifier : "",
      password,
    };

    try {
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        if (result.redirect === "/admin") {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input onChange={handleInput} type="text" name="identifier" required />
          <label>Username or Email</label>
        </div>
        <div className="user-box">
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            name="password" 
            required 
          />
          <label>Password</label>
        </div>
        <div className='a-tag'>
          <button type='submit'>Login</button>
          <Link to={'/'}><p>Not have an account?</p></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
