import React from 'react';
import "./styles/paginationCard.css"

const Pagination = ({ currentPage, totalPage, onPageChange }) => {

    const handlePrev = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        if (currentPage < totalPage) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <div className='pagination'>
            <button className='btn_pag' onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
            <span className='pag_span'>{currentPage} / {totalPage}</span>
            <button className='btn_pag' onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
        </div>
    );
}

export default Pagination;