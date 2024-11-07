import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchTransaction } from "../../Helpers/fetch.hooks";
import Aside from "../Components/Aside";
import TopNav from "../Components/TopNav";
import Sidebar from "../Components/Sidebar";
import Button from "../../Components/Helpers/Button";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";

function ViewTransaction({ setSelectedCard }) {
  const loc = useLocation();
  const pathName = loc.pathname.split("/")[3];
  const { isFetchingTransction, transaction } = useFetchTransaction(pathName);
  const item = transaction?.data;
  const [isLoading, setIsLoading] = useState(false);

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

  const handleUpdateTransactionStatus = () => {
    setSelectedCard('updateTransactionStatus')
  }

  return (
    <div className="relative w-full overflow-x-hidden flex">
      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px] flex flex-col justify-center items-center">
        <TopNav />

        <div className="flex mt-8 items-center">
            {isFetchingTransction ? (
                <div className="flex w-full mt-14 items-center justify-center">
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                </div>
            ) : (
                <div className="flex items-center justify-center flex-col gap-8 w-[500px] phone:w-[94%] mt-8">

                    <div className="p-6 w-full rounded-[12px] border-[1px] border-gray-10 p-8 flex flex-col gap-6">
                        <h2 className="font-semibold text-[20px] text-gray-60">
                        Transaction Details
                        </h2>

                        <div className="flex flex-col gap-6">
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">
                            Payment Method
                            </p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {item?.paymentMethod}
                            </p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">Service</p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {item?.service}
                            </p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">Number</p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {item?.number}
                            </p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">
                            Transaction ID
                            </p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {item?.transactionId}
                            </p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">Amount</p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {item?.totalAmount}
                            </p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">
                            Total Amount Payable
                            </p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {item?.totalAmount}
                            </p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="text-[14px] font-normal text-gray-70">Date</p>
                            <p className="text-[14px] text-gray-80 font-medium">
                            {formatDate(item?.createdAt)}
                            </p>
                        </span>
                        </div>

                        <div className="mt-8 flex flex-col w-full items-center justify-between gap-8 phone:gap-6">
                            <Button link={'all-transactions'} name={'Back'} styles={`w-full bg-second-color hover:bg-second-color-hover text-white`} />
                            <ButtonTwo onClick={handleUpdateTransactionStatus} text={'Update Transaction Status'} />
                        </div>
                    </div>


                </div>
            )}

        </div>

    </div>

    <div className="ml-auto w-[215px]">
        <Aside />
      </div>
    </div>
  );
}

export default ViewTransaction;
