import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import MTNImg from '../assets/mtn2.png'
import AirtelImg from '../assets/airtel2.png'
import GloImg from '../assets/glo2.png'
import NineMobileImg from '../assets/9mobile2.png'
import DSTVIMG from '../assets/dstv.png'
import StartimesImg from '../assets/startimes.png'
import ShowMaxImg from '../assets/showmax.png'
import LOGOIMG from '../assets/logo.png'
import { useFetchUserTransaction } from "../Helpers/fetch.hooks";
import { GoDownload } from "react-icons/go";
import { BiError } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import { downloadReciept } from "../Helpers/api";
import { useState } from "react";
import LoadingBtn from "../Components/Helpers/LoadingBtn";


function TransactionDetailPage({ toggleMenu, showMenu, setSelectedCard }) {
  const loc = useLocation()
  const pathName = loc.pathname.split('/')[2]
  const { isFetchingUserTransction, userTransaction } = useFetchUserTransaction(pathName)
  const item = userTransaction?.data
  const [ isLoading, setIsLoading ] = useState(false)
  //console.log('first', item )
    
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11-13
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

// Utility function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get the day, month, year, and time components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert hours to 12-hour format and determine AM/PM
    const isPM = hours >= 12;
    const formattedHours = ((hours + 11) % 12 + 1); // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const period = isPM ? 'PM' : 'AM';
    
    // Format the date string
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}, ${formattedHours}:${formattedMinutes}${period}`;
};

const handleDownloadRecipt = async (id) => {
  if(isLoading){
    return
  }
  try {
    setIsLoading(true)
    const res = await downloadReciept({id})
  } catch (error) {
    
  } finally {
    setIsLoading(false)
  }
}

const handleReportTransaction = () => {
  setSelectedCard('reportTransaction')
}

  return (
    <div className="flex w-full min-h-[100vh]">
      <div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
        <div className="fixed w-[304px] left-0 top-0 flex h-full">
          <Sidebar />
        </div>
      </div>

      <div className="relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto">
        <div className="w-[96%] phone:w-[96%] ">
          <div className="mt-6 flex items-center gap-4">
            <Link to='/transaction-histroy'>
              <FaArrowLeft className="text-[20px]" />
            </Link>
            <TopNav
              toggleMenu={toggleMenu}
              showMenu={showMenu}
              title={"Transaction Detais"}
            />
          </div>

          {
            isFetchingUserTransction ? (
              <div className='flex w-full mt-14 items-center justify-center'>
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>   
              </div>
            ) : (
            <div className="flex flex-col gap-8 w-[500px] phone:w-[94%] mt-8">
                <div className="flex items-center justify-between">
                    <img 
                      src={
                            item?.platform.toLowerCase() === 'mtn' ? MTNImg 
                            : item?.platform.toLowerCase() === 'glo8' ? GloImg 
                            : item?.platform.toLowerCase() === 'airtel' ? AirtelImg 
                            : item?.platform.toLowerCase() === 'dstv' ? DSTVIMG
                            : item?.platform.toLowerCase() === 'startimes' ? StartimesImg
                            : LOGOIMG
                          } 
                      alt={item?.service} 
                      className={`w-[108px]`} 
                    />

                    <div className="flex flex-col gap-3 text-end">
                      <p className="text-[14px] font-semibold text-gray-70">{item.service}</p>
                      <p className="text-[14px] font-normal text-gray-70">{item.number}</p>
                      <p className={`text-[14px] font-semibold ${item?.status.toLowerCase() === 'successful' ? 'text-success' : item?.status.toLowerCase() === 'initiated' ? 'text-warning' : 'text-error'}`}>{item?.status}</p>
                      <p className="text-[14px] font-normal text-gray-70">{formatDate(item?.createdAt)}</p>
                    </div>
                </div>

                <div className=" flex items-center justify-between">
                  {
                    isLoading ? (
                      <LoadingBtn />
                    ) : (
                      <div onClick={() => handleDownloadRecipt(item.transactionId)} className="cursor-pointer rounded-[6px] p-2 flex items-center gap-[10px] bg-gray-20">
                        <p className="text-[16px] font-semibold text-second-color">Download Receipt</p>
                        <GoDownload className="text-[20px] text-second-color" />
                      </div>
                    )
                  }

                  <div onClick={handleReportTransaction} className="cursor-pointer rounded-[6px] p-2 flex items-center gap-[10px] bg-gray-20">
                    <p className="text-[16px] font-semibold text-error">Report Transaction</p>
                    <BiError className="text-[20px] text-error" />
                  </div>
                </div>

                <div className="p-6 rounded-[12px] border-[1px] border-gray-10 bg-gray-30 flex flex-col gap-6">
                  <h2 className="font-semibold text-[20px] text-gray-60">Transaction Details</h2>

                  <div className="flex flex-col gap-6">
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Payment Method</p>
                        <p className="text-[14px] text-gray-80 font-medium">{item?.paymentMethod}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Service</p>
                        <p className="text-[14px] text-gray-80 font-medium">{item?.service}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Number</p>
                        <p className="text-[14px] text-gray-80 font-medium">{item?.number}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Transaction ID</p>
                        <p className="text-[14px] text-gray-80 font-medium">{item?.transactionId}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Amount</p>
                        <p className="text-[14px] text-gray-80 font-medium">{item?.totalAmount}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Total Amount Payable</p>
                        <p className="text-[14px] text-gray-80 font-medium">{item?.totalAmount}</p>
                      </span>
                      <span className="flex items-center justify-between">
                        <p className="text-[14px] font-normal text-gray-70">Date</p>
                        <p className="text-[14px] text-gray-80 font-medium">{formatDate(item?.createdAt)}</p>
                      </span>
                  </div>
                </div>
            </div>

            )
          }

        </div>
      </div>
    </div>
  );
}

export default TransactionDetailPage;
