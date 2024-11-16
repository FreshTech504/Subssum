import { useState } from "react"
import ButtonTwo from "../Helpers/ButtonTwo"
import LoadingBtn from "../Helpers/LoadingBtn"
import { markReportTransaction } from "../../Helpers/api"
import toast from "react-hot-toast"

function ViewReportedTransaction({ reportedTransactionData }) {

    const [ loading, setLoading ] = useState(false)
    const handleResolve = async () => {
        try {
            setLoading(true)
            const res = await markReportTransaction({ id: reportedTransactionData._id })
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
    <div className="flex flex-col h-[70vh] overflow-y-auto scrollbar-thin">
        <div className="flex flex-col gap-2">
            <h3 className="text-[20px] font-semibold text-gray-80">Name</h3>
            <p>{reportedTransactionData?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-[20px] font-semibold text-gray-80">Email</h3>
            <p>{reportedTransactionData?.email}</p>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-[20px] font-semibold text-gray-80">Description</h3>
            <p>{reportedTransactionData?.description}</p>
        </div>
        {
            reportedTransactionData?.image && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-[20px] font-semibold text-gray-80">Image</h3>
                    <img alt='image' src={reportedTransactionData?.image} className="w-[70%]" />
                </div>
            )
        }


        <div className="mt-8">
            {
                loading ? (
                    <LoadingBtn />
                ) : (
                    <ButtonTwo onClick={handleResolve} text={`${reportedTransactionData?.resolved ? 'Mark as unResolove' : 'Mark as Resolove' }`} />
                )
            }
        </div>
      
    </div>
  )
}

export default ViewReportedTransaction
