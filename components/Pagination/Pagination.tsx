import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        pageRangeDisplayed={4}
        marginPagesDisplayed={0}
        nextLabel="→"
        previousLabel="←"
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    </>
  );
}
