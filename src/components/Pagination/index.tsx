import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { observer } from "mobx-react";
import { PaginationProps } from "../../types/transactionsTypes";

import {
  PaginationNavBar,
  PaginationUnOrderList,
  PaginationAnchorElement,
  PaginationListElement,
} from "./styledComponents";

const Pagination = (props: PaginationProps) => {
  const { itemsPerPage, totalItems, currentPage, setCurrentPage } = props;

  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

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
        <PaginationListElement
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <PaginationAnchorElement
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={totalPages === currentPage}
          >
            <IoIosArrowForward />
          </PaginationAnchorElement>
        </PaginationListElement>
      </PaginationUnOrderList>
    </PaginationNavBar>
  );
};

export default observer(Pagination);
