import ButtonTwo from "../../Helpers/ButtonTwo"
import PlaneImg from '../../../assets/plane.png'
import CardImg from '../../../assets/cardCheck.png'
import { useEffect } from "react"

function CardTwo({ formData, setFormData, setActiveCard, setIsLoading, setSelectedCard }) {
  const handlePayWithWallet = () => {
    setSelectedCard('setTransactionPin')
  }

  useEffect(() => {
    setFormData({ ...formData, proceed: false });
}, []);
  
  const handleSetPin = () => {
    setIsLoading(true)
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

              <ButtonTwo onClick={handlePayWithWallet} text={'Pay With Wallet'} />

              {
                /**
                 * 
              <div className="flex gap-3 w-full phone:flex-col">
                  <div className="rounded-[10px] flex-1 border-[1px] pt-[9px] pr-[8px] pb-[9px] pl-[8px] flex items-center gap-[10px] border-l-gray-30 bg-white">
                    <span className="p-[4px] bg-gray-20 rounded-[6px]">
                      <img className="w-[24px]" src={CardImg} alt="pay with card" />
                    </span>
                    <p className="text-second-color font-semibold text-[16px]">With Card</p>
                  </div>
                  <div className="rounded-[10px] flex-1 border-[1px] pt-[9px] pr-[8px] pb-[9px] pl-[8px] flex items-center gap-[10px] border-l-gray-30 bg-white">
                    <span className="p-[4px] bg-gray-20 rounded-[6px]">
                      <img className="w-6" src={PlaneImg} alt="bank transfer" />
                    </span>
                    <p className="text-second-color font-semibold text-[16px]">Bank Transfer</p>
                  </div>
              </div>
                 */
              }

            </div>

        </div>
    </div>
  )
}

export default CardTwo