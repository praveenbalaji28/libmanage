// MainPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push('/user/login'); // Redirect to user login page
  };

  const handleAdminClick = () => {
    history.push('/admin'); // Redirect to admin page
  };

  return (
    <div>
      <h1>Welcome to the Library Management System</h1>
      <div>
        <button onClick={handleUserClick}>User</button>
        <button onClick={handleAdminClick}>Admin</button>
      </div>
    </div>
  );
};

export default MainPage;