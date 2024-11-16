import { useLocation, useNavigate } from "react-router-dom"
import Aside from "../../Components/Aside"
import Sidebar from "../../Components/Sidebar"
import TopNav from "../../Components/TopNav"
import { useFetAllAirtimeToCash } from "../../../Helpers/fetch.hooks"
import { useState } from "react"
import ButtonTwo from "../../../Components/Helpers/ButtonTwo"
import LoadingBtn from "../../../Components/Helpers/LoadingBtn"
import toast from "react-hot-toast"
import { updateAirtime2Cash } from "../../../Helpers/api"

function AdminAirtimeCashDetails() {
    const navigate = useNavigate()
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]

    const { isFetchingTransactionData, transactionData } = useFetAllAirtimeToCash(pathName)
    const transactionHistroy = transactionData?.data
    
    const [ loading, setLoading ] = useState(false)

    const handleUpdatedStatus = async (value) => {
        try {
            setLoading(true)
            const res = await updateAirtime2Cash({ status: value, _id: pathName })
            if(res.success){
                toast.success(res.data)
                window.location.reload()
            } else {
                toast.error(res.data)
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

      <div className="relative w-full ml-[276px] mb-12">
        <TopNav />

        <div className="mt-[100px] px-12">
            <h1 className="text-[26px] mt-11 font-semibold text-[#1F2937]">
                Transaction Details
          </h1>
          
          <div>
            {
                isFetchingTransactionData ? (
                <div className="absolute flex w-full top-20 items-center justify-center">
                    <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>
                </div>
                ) : (
                    <div className="flex flex-col gap-6 mt-12">
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">Network</label>
                            <input type="text" defaultValue={transactionHistroy?.platform} disabled className="input w-full" />
                        </div>
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">Transaction ID</label>
                            <input type="text" defaultValue={transactionHistroy?.transactionId} disabled className="input w-full" />
                        </div>
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">Status</label>
                            <input type="text" defaultValue={transactionHistroy?.status} disabled className="input w-full" />
                        </div>
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">Email</label>
                            <input type="text" defaultValue={transactionHistroy?.email} disabled className="input w-full" />
                        </div>
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">User ID</label>
                            <input type="text" defaultValue={transactionHistroy?.userId} disabled className="input w-full" />
                        </div>
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">Amout</label>
                            <input type="text" defaultValue={transactionHistroy?.amount} disabled className="input w-full" />
                        </div>
                        <div className="inputGroup flex items-center w-full flex-row">
                            <label className="label w-[20%]">Total Amount Payable</label>
                            <input type="text" defaultValue={transactionHistroy?.totalAmount} disabled className="input w-full" />
                        </div>


                        {/**BUTTONS */}
                        <div className="flex mt-8 items-center gap-12">
                            { loading ? (<LoadingBtn />) : (<ButtonTwo onClick={() => handleUpdatedStatus('approve')} text={'Approve'} />)} 
                            { loading ? (<LoadingBtn />) : (<ButtonTwo onClick={() => handleUpdatedStatus('hold')} text={'Hold'} />)} 
                            { loading ? (<LoadingBtn />) : (<ButtonTwo onClick={() => handleUpdatedStatus('reject')} text={'Reject'} />)}
                        </div>

                    </div>
                )
            }
          </div>
        </div>
        
      </div>

      <div className="ml-auto w-[215px]" >
        <Aside />
      </div>

        
    </div>
  )
}

export default AdminAirtimeCashDetails
