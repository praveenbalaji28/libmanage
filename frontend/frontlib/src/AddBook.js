// AddBook.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css'; // Import CSS file for styling

const AddBook = ({ history, onAddBook }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    published_year: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/books', bookData);
      history.push('/');
      setBookData({
        title: '',
        author: '',
        isbn: '',
        published_year: ''
    }
 )
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleInputChange}
          className="input-field"
        />
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleInputChange}
          className="input-field"
        />
        <label>ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={bookData.isbn}
          onChange={handleInputChange}
          className="input-field"
        />
        <label>Published Year:</label>
        <input
          type="text"
          name="published_year"
          value={bookData.published_year}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="add-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
