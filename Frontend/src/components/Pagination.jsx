import PropTypes from 'prop-types';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const handlePrevious = () => {
      if (page > 1) {
        onPageChange(page - 1);
      }
    };
  
    const handleNext = () => {
      if (page < totalPages) {
        onPageChange(page + 1);
      }
    };
  
    return (
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-md mx-1 ${page==1?"cursor-not-allowed":"cursor-pointer"}`}
        >
          Previous
        </button>
        <span className="px-3 py-1">{page} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-md mx-1 ${page==totalPages?"cursor-not-allowed":"cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    );
  };
  
  Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
  };

  export default Pagination;
  