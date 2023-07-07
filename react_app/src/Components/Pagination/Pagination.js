import React, { useEffect } from "react";
import "./Pagination.css";

function Pagination({ items = [], currentPage, totalPages, onPageChange }) {
  useEffect(() => {
    const interval = setInterval(() => {
      onPageChange((prevPage) => (prevPage % totalPages) + 1);
    }, 10000); // Adjust the interval time according to your requirement

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
          className={`pagination-item ${i === currentPage ? "active" : ""}`}
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
