import React from 'react';
import styles from './Pagination.module.css';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({className, currentPage, setCurrentPage, pages}) => {

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const toPage = (pageNum) => {
        setCurrentPage(pageNum);
    }

    return (
        <div className={`${styles.pagination} ${className}`}>
            {
                currentPage > 1
                ? <Button color="blue" onClick={prevPage}><FontAwesomeIcon icon={faChevronLeft}/></Button>
                : null
            }
            {
                pages > 2
                ? (
                    Array(pages).fill(0).map((page, i) => {
                        return <Button 
                                    onClick={() => toPage(i + 1)}
                                    color={currentPage === i + 1 ? "purple" : "blue"}
                                >{i + 1}</Button>
                    })
                )
                : null
            }
            {
                currentPage < pages
                ? <Button color="blue" onClick={nextPage}><FontAwesomeIcon icon={faChevronRight}/></Button>
                : null
            }
        </div>
    )
}

export default Pagination