import React, { useState, useEffect } from 'react'
import Aside from '../../Components/Aside'
import TopNav from '../../Components/TopNav'
import Sidebar from '../../Components/Sidebar'
import { useFetAllDataPlans, useFetAllNetworks } from '../../../Helpers/fetch.hooks'
import { Link } from 'react-router-dom'

function AdminData() {
    const { isFetchingNetworkData, networkData } = useFetAllNetworks()
    const mobileNetworkData = networkData?.data
    const { dataPlans, isFetchingDataPlans } = useFetAllDataPlans()
    const dataPlansData = dataPlans?.data
    //console.log('object', dataPlansData)
    
    const [availablePlans, setAvailablePlans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        if (dataPlansData) {
            setAvailablePlans(dataPlansData);
        }
    }, [dataPlansData]);

    const handleNetworkChange = (e) => {
      const value = e.target.value;
      if(value){
          const filterPlans = dataPlansData?.filter(plan => plan?.networkCode.toString() === value);
          setAvailablePlans(filterPlans);
          setCurrentPage(1); // Reset to first page after filtering
      } else {
          setAvailablePlans(dataPlansData);
          setCurrentPage(1); // Reset to first page
      }
    };

    // Calculate pagination indices
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlans = availablePlans.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(availablePlans.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="relative w-full overflow-x-hidden flex">
            <div className="h-[100vh] w-[276px] fixed left-0 top-0">
                <Sidebar />
            </div>

            <div className="relative w-full ml-[276px]">
                <TopNav />

                <div className="mt-[100px] px-12">
                    <div className="flex items-center gap-8">
                        <div className="py-[9px] px-[4px] rounded-[15px] text-[16px] font-medium cursor-pointer">
                            <select onChange={handleNetworkChange} name="" id="" className="input rounded-[15px]">
                                <option value="">-- ALL NETWORK --</option>
                                {
                                    mobileNetworkData?.map((item, idx) => (
                                        <option key={idx} value={item.code}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <Link to='/new-data-plan/noid' className="bg-gray-60 py-[9px] px-[4px] rounded-[15px] text-white text-[16px] font-medium cursor-pointer">
                            Add New Plan
                        </Link>
                        <Link to='/new-network/noid' className="bg-gray-60 py-[9px] px-[4px] rounded-[15px] text-white text-[16px] font-medium cursor-pointer">
                            Add New Network
                        </Link>
                    </div>

                    <div className='mt-12 flex items-center justify-center gap-4 flex-wrap'>
                        {   
                            isFetchingDataPlans ? (
                                <div className="absolute flex w-full top-20 items-center justify-center">
                                    <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                                </div>
                            ) : (
                                currentPlans?.map((item) => (
                                    <Link key={item._id} to={`/new-data-plan/${item._id}`} className="w-[174px] p-6 gap-5 cursor-pointer hover:shadow-xl mb-4 flex flex-col items-center justify-center rounded-[20px] border-[1px]">
                                        <p className='text-gray-70 font-medium text-[20px]'>{item.validity}</p>
                                        <p className='text-[21px] text-center font-semibold text-[#000000]'>
                                            {item?.planName}
                                        </p>
                                        <p className='text-[20px] font-medium'>NGN {item.price}</p>
                                        <p className='text-[20px] font-medium'>{item?.networkName}</p>
                                    </Link>
                                ))
                            )
                        }
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-center mt-8">
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleClick(idx + 1)}
                                className={`px-4 py-2 mx-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            <div className="ml-auto w-[215px]">
                <Aside />
            </div>
        </div>
    )
}

export default AdminData
