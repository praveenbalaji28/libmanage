import React from 'react';

const PagesButton = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>View Pages</button>
    </div>
  );
};

export default PagesButton;
