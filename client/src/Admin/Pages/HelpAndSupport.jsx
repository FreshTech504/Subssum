import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import Aside from '../Components/Aside'
import { useFetchReportedTransactions } from '../../Helpers/fetch.hooks'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useState } from 'react'

function HelpAndSupport({ truncateText, setReportedTransactionData, setSelectedCard }) {
  const { isFetchingReportedTransactions, reportedTransactionsData } = useFetchReportedTransactions();
  const reports = reportedTransactionsData?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuery = (value) => {
    setSearchQuery(value);
  };

  const itemsPerPage = 9;

  // Filter and sort reports
  const filteredAndSortedUsers = reports
    .filter(user => searchQuery === '' || user?.resolved === (searchQuery === 'true')) // Filter based on search query
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt in descending order

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  // Get the current page's users
  const currentUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-[#1ABBB9] text-white" : "bg-[#F1F7FF]"}`}
        >
          {i + 1}
        </button>
      ));
    } else {
      return (
        <>
          <button onClick={() => setCurrentPage(1)} className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-[#1ABBB9] text-white" : "bg-[#F1F7FF]"}`}>1</button>
          <button onClick={() => setCurrentPage(2)} className={`px-3 py-1 rounded ${currentPage === 2 ? "bg-[#1ABBB9] text-white" : "bg-[#F1F7FF]"}`}>2</button>
          <button onClick={() => setCurrentPage(3)} className={`px-3 py-1 rounded ${currentPage === 3 ? "bg-[#1ABBB9] text-white" : "bg-[#F1F7FF]"}`}>3</button>
          <span className="px-2">...</span>
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={totalPages - 2 + i}
              onClick={() => setCurrentPage(totalPages - 2 + i)}
              className={`px-3 py-1 rounded ${currentPage === totalPages - 2 + i ? "bg-[#1ABBB9] text-white" : "bg-[#F1F7FF]"}`}
            >
              {totalPages - 2 + i}
            </button>
          ))}
        </>
      );
    }
  };

  const handleView = (data) => {
    setReportedTransactionData(data);
    setSelectedCard('viewReportedTransaction');
  };

  return (
    <div className="relative w-full overflow-x-hidden flex">
      <div className="h-[100vh] w-[276px] fixed top-0 left-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          {/* Search Bar */}
          <div className='flex'>
            <div className="mr-auto flex flex-col">
              <p>Total Reports: {filteredAndSortedUsers?.length}</p>
            </div>

            <div>
              <select onChange={(e) => handleQuery(e.target.value)} className="input">
                <option value="">-- SORT --</option>
                <option value="false">UnResolved</option>
                <option value="true">Resolved</option>
              </select>
            </div>
          </div>

          <table className="overflow-y-auto mt-8 h-full w-[96%] border-collapse">
            <thead className="w-full bg-[#F9F9F9] phone:text-start">
              <tr className="text-[12px] py-[16px] px-[12px] text-[#333333] font-semibold gap-[10px]">
                <th className="py-[16px] px-[12px] text-start">Name</th>
                <th className="py-[16px] px-[12px] text-start">Email</th>
                <th className="py-[16px] px-[12px] text-start">Report</th>
                <th className="py-[16px] px-[12px] text-start">Action</th>
              </tr>
            </thead>

            <tbody>
              {isFetchingReportedTransactions ? (
                <div className="absolute flex w-full top-12 items-center justify-center">
                  <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                </div>
              ) : (
                currentUsers.map((item) => (
                  <tr key={item._id} className='border-b-[1px]'>
                    <td className='py-[16px] px-[12px] flex flex-col'>
                      <p className='text-[#333333] font-semibold text-[12px]'>{item?.name}</p>
                    </td>
                    <td className='py-[16px] px-[12px] text-[12px] font-normal text-[#828282]'>{item?.email}</td>
                    <td className='py-[16px] px-[12px] text-[12px] font-normal text-[#828282]'>{truncateText(item?.description, 30)}</td>
                    <td className='py-[16px] px-[12px]'>
                      <div onClick={() => handleView(item)} className='cursor-pointer text-center py-[13px] px-[24px] bg-[#6882B6] text-white rounded-[15px] text-[12px]'>View</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center gap-[12px] justify-center mt-6 mb-8">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-white text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
              <IoIosArrowBack />
            </button>

            <div className="flex gap-1">{renderPagination()}</div>

            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 ml-2 bg-white text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>

      <div className="ml-auto w-[215px]">
        <Aside />
      </div>
    </div>
  );
}

export default HelpAndSupport;
