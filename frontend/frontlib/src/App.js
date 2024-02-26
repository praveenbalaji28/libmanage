import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './BookList';
import AddBook from './AddBook';
import MainPage from './MainPage';
import UserLoginPage from './UserLoginPage'; // Import UserLoginPage component
import UserDashboard from './UserDashboard';
const App = () => {
  return (
    <Router>
      <div>
        <h1>Library Management System</h1>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/user/login" component={UserLoginPage} /> {/* Route for UserLoginPage */}
          <Route path="/user/dashboard" component={UserDashboard} /> {/* Route for UserDashboard */}
          <Route exact path="/admin" component={BookList} />
          <Route path="/add" component={AddBook} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
