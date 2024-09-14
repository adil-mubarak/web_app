import React, { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = async() => {
    const response = await fetch('http://localhost:5555/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
  });
  const result = await response.json();
  if (response.ok) {
    alert(result.message);
} else {
    alert(`Error: ${result.error || result.message}`);
}
  }
  return (
    <div className="signup-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input onChange={(e)=>setName(e.target.value)} type="text" name="username" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" required />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" required />
          <label>Password</label>
        </div>
        {/* <div className="user-box">
          <input type="password" name="confirm-password" required />
          <label>Confirm Password</label>
        </div> */}
        <div className='a-tag'>
        <button type='submit'>Signup</button>
        <Link to={'/login'}><p href="">Already have an account ? </p></Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
