import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';
import SortButton from './SortButton';
import Pagination from './Pagination';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://lib-backend-jre2.onrender.com/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = () => {  };

  const handleSort = () => {
    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.published_year - b.published_year;
      } else {
        return b.published_year - a.published_year;
      }
    });
    setFilteredBooks(sortedBooks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://lib-backend-jre2.onrender.com/api/books/${id}`);
      // Remove the deleted book from the books state array
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2 className="book-list-heading">Book List</h2>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
            placeholder="Search..."
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <SortButton onClick={handleSort} />
          <Link to="/add" className="add-button">Add</Link>
        </div>
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>
              Published Year{' '}
              {sortOrder === 'asc' ? (
                <span>&uarr;</span>
              ) : (
                <span>&darr;</span>
              )}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.published_year}</td>
              <td>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;