import ButtonTwo from "../../Helpers/ButtonTwo"
import PlaneImg from '../../../assets/plane.png'
import CardImg from '../../../assets/cardCheck.png'
import { useEffect } from "react"
import { PaystackButton } from "react-paystack"

function CardTwo({ formData, setFormData, setActiveCard, isLoading, setSelectedCard, componentProps }) {
  const handlePay = () => {
    setSelectedCard('setTransactionPin')
  }


  return (
    <div className="card3">
        <div className="flex flex-col gap-8 w-full">
            <h2 className="font-semibold text-[20px] text-gray-60 text-center">Confirm Transaction Details</h2>
            
            <div className="flex flex-col gap-6 w-full">
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Network</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.networkName}</p>
              </span>
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Phone Number</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.phoneNumber}</p>
              </span>
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Plan</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.planName}</p>
              </span>
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Amount</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.price}</p>
              </span>
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Total Payable Amount</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.totalAmount}</p>
              </span>
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Transaction ID</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.transactionId}</p>
              </span>
              <span className="flex items-center justify-between">
                <h3 className="text-[14.5px] text-gray-70 font-normal">Status</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.status}</p>
              </span>
            </div>
            
            <div className="bg-white border-[1px] p-4 border-l-gray-30 rounded-[12px] flex flex-col gap-4">
              <h2 className="font-semibold text-[16px] text-center text-gray-60">Choose Payment Method</h2>

              <PaystackButton className="pad1 phone:pad7 rounded-[10px] flex items-center justify-center text-center bg-second-color hover:bg-second-color-hover text-white" disabled={isLoading} {...componentProps} />


            </div>

        </div>
    </div>
  )
}

export default CardTwo