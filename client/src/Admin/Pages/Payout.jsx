import Sidebar from "../Components/Sidebar";
import TopNav from "../Components/TopNav";
import Aside from "../Components/Aside";
import { useFetAllpayoutRequest } from "../../Helpers/fetch.hooks";
import { TbCurrencyNaira } from "react-icons/tb";
import { format } from 'date-fns';
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import { useState } from "react";
import { approvePayout } from "../../Helpers/api";
import toast from "react-hot-toast";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";

function Payout() {
  const { isFetchingPayoutRequest, payoutrequestData } = useFetAllpayoutRequest();
  const payoutData = payoutrequestData?.data;

  const [ loading, setLoading ] = useState(false)

  const handleApprovePayout = async (value) => {
    try {
      const confirm = window.confirm('Are you sure you want to approve this payout. action is not reversible')
      if(confirm) {
        setLoading(true)
        const res = await approvePayout({ id: value })
        if(res.success){
          toast.success(res.data)
          window.location.reload()
        } else {
          toast.error(res.data)
        }
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full overflow-x-hidden flex">
      <div className="h-[100vh] w-[276px] fixed left-0 top-0">
        <Sidebar />
      </div>

      <div className="relative w-full ml-[276px]">
        <TopNav />

        <div className="mt-[100px] px-12">
          <h1 className='text-[26px] mt-11 font-semibold text-[#1F2937]'>
            Payout
          </h1>

          <div className="flex items-center flex-wrap gap-4 mb-6 mt-8">
            {isFetchingPayoutRequest ? (
              <div className="absolute flex w-full top-20 items-center justify-center">
                <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
              </div>
            ) : (
              payoutData?.map((item) => (
                <div key={item._id} className="bg-white shadow-md hover:shadow-lg w-[347px] rounded-[15px] p-4 flex flex-col">
                    <h3 className="text-[14px] font-medium text-[#000000]" >User Request</h3>

                    <p className="text-[16px] font-medium text-[#000000]" >{item?.bankName} is requesting a payment</p>

                    <div className="mt-8 rounded-[15px] p-4 bg-[#F8F8F8] flex flex-col">
                        <div className="flex flex-col gap-[2px]">
                          <p className="text-[32px] flex items-center gap-[2px]">
                            <TbCurrencyNaira />
                            {item?.amount}
                          </p>
                          <small>Date: {item?.createdAt ? format(new Date(item.createdAt), 'MMMM d, yyyy') : 'N/A'}</small>
                        </div>

                        <hr />

                        <div className="">
                        <p className="text-[16px] font-medium text-[#000000]" >Airtime to cash serice</p>
                        </div>
                    </div>

                    <div className="mt-6 px-8">
                      {
                        item?._id && loading ? (
                          <LoadingBtn />
                        ) : (
                          <ButtonTwo onClick={() => handleApprovePayout(item._id)} text={'ACCEPT'} />
                        )
                      }
                    </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="ml-auto w-[215px]">
        <Aside />
      </div>
    </div>
  );
}

export default Payout;
