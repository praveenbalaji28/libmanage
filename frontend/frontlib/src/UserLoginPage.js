// UserLoginPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Add login logic here (e.g., authenticate user)
    // For simplicity, let's assume login is successful if username and password are not empty
    if (username !== '' && password !== '') {
      history.push('/user/dashboard'); // Redirect to user dashboard upon successful login
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default UserLoginPage;
