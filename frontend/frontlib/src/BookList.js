import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css'; // Import CSS file
import SortButton from './SortButton';
import Pagination from './Pagination'; // Import the Pagination component

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(7); // Change to display more books per page
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = () => {
    // Handle search functionality here
    alert('Search button clicked with term: ' + searchTerm);
  };

  const handleSort = () => {
    // Handle sort functionality here
    alert('Sort button clicked!');
  };

  const handleAdd = () => {
    // Handle add functionality here
    alert('Add button clicked!');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2 className="book-list-heading">Book List</h2>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            placeholder="Search..."
          />
          <button onClick={handleSearch} className="search-button">Search</button>
          <SortButton onClick={handleSort} />
          <button onClick={handleAdd} className="add-button">Add</button> {/* Add button */}
        </div>
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Published Year</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.published_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(books.length / booksPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;
