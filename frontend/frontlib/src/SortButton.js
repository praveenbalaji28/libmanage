import React from 'react';

const SortButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="sort-button">Sort</button>
  );
};

export default SortButton;
