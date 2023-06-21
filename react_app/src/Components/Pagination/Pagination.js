import React, { useEffect } from "react";
import "./Pagination.css";

function Pagination({ items, currentPage, itemsPerPage, onPageChange  }) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
 
  useEffect(() => {
    const interval = setInterval(() => {
      onPageChange((prevPage) => (prevPage % totalPages) + 1);
    }, 10000000);

    return () => clearInterval(interval);
  }, [onPageChange, totalPages]);

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
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

  return <ul className="pagination">{renderPaginationItems()}</ul>;
}

export default Pagination;
