import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import TopNav from '../../Components/TopNav'
import Aside from '../../Components/Aside'
import { useFetAllAirtimeToCash } from '../../../Helpers/fetch.hooks'
import { filterOptions } from '../../data/filterOptions'
import { CiSearch } from 'react-icons/ci'
import FilterImg from '../../../assets/filter.png'
import { Link } from 'react-router-dom'
import { TbCurrencyNaira } from 'react-icons/tb'

function AdminAirtimeToCash() {
  const { isFetchingTransactionData, transactionData } = useFetAllAirtimeToCash()
  //const data = transactionData?.data
  //console.log('object1', transactionData, 'object2', data)
  const [filterOption, setFilterOption] = useState(false);
  const [filterValue, setFilterValue] = useState(filterOptions[0].value);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const transactionHistroy = transactionData?.data || [];

  const handleFilterOptions = () => {
    setFilterOption((prev) => !prev);
  };

  const handleSelectedFilter = (value) => {
    setFilterOption(false);
    setFilterValue(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!transactionHistroy.length) return;

    let filtered = [...transactionHistroy];

    // Apply filter based on selected filter value
    switch (filterValue) {
      case "latest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "successful":
        filtered = filtered.filter(
          (item) => item.status.toLowerCase() === "successful"
        );
        break;
      case "initiated":
        filtered = filtered.filter(
          (item) => item.status.toLowerCase() === "initiated"
        );
        break;
      case "failed":
        filtered = filtered.filter(
          (item) => item.status.toLowerCase() === "failed"
        );
        break;
      default:
        break;
    }

    // Apply search filter based on email or transaction ID
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [filterValue, transactionHistroy, searchTerm]);

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Special case for 11-13
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Utility function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get the day, month, year, and time components
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const isPM = hours >= 12;
    const formattedHours = ((hours + 11) % 12) + 1; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const period = isPM ? "PM" : "AM";

    // Format the date string
    return `${day}${getOrdinalSuffix(
      day
    )} ${month}, ${year}, ${formattedHours}:${formattedMinutes}${period}`;
  };

  return (
    <div className="relative w-full overflow-x-hidden flex">

      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          <h1 className="text-[26px] mt-11 font-semibold text-[#1F2937]">
            Airtime To Cash Transactions
          </h1>

          {/**TRANSACTION DATA */}
          <div className="flex flex-col gap-8">

          <div className="flex px-4 items-center justify-between mt-8">
          <div className="bg-gray-10 flex items-center gap-1">
            <CiSearch className="text-[24px]" />            
            <input
              type="text"
              placeholder="Transaction ID, Search Email."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input bg-transparent border-none"
            />
          </div>

            <div
              onClick={handleFilterOptions}
              className=" ml-auto flex p-2 w-[190px] cursor-pointer rounded-[12px] border-[1px] border-gray-30 bg-gray-10 items-center gap-2"
            >
              <img className="w-[15.6px] h-[9.6px]" alt="filter" src={FilterImg} />
              <p className="text-[16px] text-color-4">Filter</p>
            </div>
            {filterOption && (
              <div className="absolute z-40 top-[50px] left-0 flex p-2 w-[190px] rounded-[12px] border-[1px] border-gray-30 bg-gray-10 items-center gap-2">
                <div className="flex flex-col w-full">
                  {filterOptions.map((item) => (
                    <div
                      key={item.value}
                      onClick={() => handleSelectedFilter(item.value)}
                      className={`w-full hover:text-color-3 font-semibold cursor-pointer p-2 border-b-[1px] border-b-gray-30 ${
                        filterValue === item.value ? "text-color-3" : "text-color-2"
                      }`}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

        </div>

        <table className="overflow-y-auto mt-8 h-full w-[96%] border-collapse">
          <thead className="w-full text-center phone:text-start">
            <tr className="text-[14px] text-gray-60 text-center  phone:text-start">
              <th className="p-2 phone:text-start">Username</th>
              <th className="p-2 phone:text-start">Amount</th>
              <th className="p-2 phone:hidden">Total Amount</th>
              <th className="p-2 phone:text-start">Status</th>
              <th className="p-2 phone:text-start">Transaction ID</th>
              <th className="p-2 phone:hidden">Action</th>
            </tr>
          </thead>

          <tbody className="relative w-full text-center phone:text-start">
            {isFetchingTransactionData ? (
              <div className="absolute flex w-full top-20 items-center justify-center">
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
              </div>
            ) : (
              filteredTransactions?.map((item) => (
                <tr key={item._id} className="border-b border-gray-30">
                  <td className="p-2">
                    <Link
                      to={`/admin-convert-to-cash-details/${item._id}`}
                      className="flex gap-2 items-center"
                    >
                      <div className="flex flex-col gap-[10px]">
                        <h2 className="text-[12px] text-gray-70 font-semibold">
                          {item?.service}
                        </h2>
                        <p className="text-[12px] text-gray-70">
                          {item?.email}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-2 text-[12px] text-gray-70 font-semibold">
                    <div className="flex items-center justify-center phone:justify-start text-center">
                      <TbCurrencyNaira className="text-[18px]" />
                      {item.amount}
                    </div>
                  </td>
                  <td className="p-2 text-[12px] text-gray-70 font-semibold text-center phone:hidden">
                    <div className="flex items-center justify-center text-center w-full">
                      <TbCurrencyNaira className="text-[18px]" />
                      {item.totalAmount}
                    </div>
                  </td>
                  <td
                    className={`p-2 ${
                      item.status.toLowerCase() === "successful"
                        ? "text-success"
                        : item.status.toLowerCase() === "initiated"
                        ? "text-warning"
                        : "text-error"
                    } text-[12px] font-semibold`}
                  >
                    {item.status}
                  </td>
                  <td className="p-2 tablet:hidden">
                    <div className="flex flex-col gap-[10px]">
                      <h2 className="text-[12px] text-gray-70 font-semibold">
                        {item.transactionId}
                      </h2>
                      <p className="text-[12px] text-gray-70 font-semibold">
                        {formatDate(item?.createdAt)}
                      </p>
                    </div>
                  </td>
                  <td className="phone:hidden">
                    <Link
                      to={`/admin-convert-to-cash-details/${item._id}`}
                      className="p-2 rounded-[6px] bg-gray-20 text-second-color text-[16px] font-semibold cursor-pointer"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

          </div>
        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default AdminAirtimeToCash
