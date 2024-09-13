import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input type="text" name="username" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" required />
          <label>Password</label>
        </div>
        <div className='a-tag'>
          <a href="#">Login</a>
          <Link to={'/'}><p href="">Not have an account ? </p></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
