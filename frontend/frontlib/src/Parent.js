// ParentComponent.js
import React from 'react';
import AddBook from './AddBook';

const ParentComponent = () => {
  const handleAddBook = (newBook) => {
    // Logic to add the new book
    console.log('New book added:', newBook);
  };

  return (
    <div>
      <h1>Library Management System</h1>
      <AddBook onAddBook={handleAddBook} />
    </div>
  );
};

export default ParentComponent;
