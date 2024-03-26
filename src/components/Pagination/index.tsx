import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import {
  PaginationNavBar,
  PaginationUnOrderList,
  PaginationAnchorElement,
  PaginationListElement,
} from "./styledComponents";
import { observer } from "mobx-react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationNavBar>
      <PaginationUnOrderList>
        <PaginationListElement>
          <PaginationAnchorElement
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </PaginationAnchorElement>
        </PaginationListElement>
        <PaginationListElement>{currentPage}</PaginationListElement>
        {/* {pageNumbers.map((number) => (
          <PaginationListElement key={number} className="page-item">
            <PaginationAnchorElement
              onClick={() => setCurrentPage(number)}
              className={`page-link ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </PaginationAnchorElement>
          </PaginationListElement>
        ))} */}
        <PaginationListElement
          className={`page-item ${
            currentPage === Math.ceil(totalItems / itemsPerPage)
              ? "disabled"
              : ""
          }`}
        >
          <PaginationAnchorElement
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={pageNumbers.length === currentPage}
          >
            <IoIosArrowForward />
          </PaginationAnchorElement>
        </PaginationListElement>
      </PaginationUnOrderList>
    </PaginationNavBar>
  );
};

export default observer(Pagination);
