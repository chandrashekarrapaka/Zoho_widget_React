import React, { useEffect } from "react";

function Pagination({ items = [], currentPage, totalPages, onPageChange }) {
  useEffect(() => {
    let interval;
  
    if (totalPages > 1) {
      interval = setInterval(() => {
        onPageChange((prevPage) => (prevPage % totalPages) + 1);
      }, 15000); 
    }
  
    return () => clearInterval(interval);
  }, [onPageChange, totalPages]);
  const handleClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }
    return paginationItems;
  };

  return (
    <ul className="pagination">
      {items.length > 0 ? renderPaginationItems() : null}
    </ul>
  );
}

export default Pagination;
