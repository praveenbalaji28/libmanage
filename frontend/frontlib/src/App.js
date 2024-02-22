import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './BookList';
import AddBook from './AddBook';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Library Management System</h1>
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route path="/add" component={AddBook} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
