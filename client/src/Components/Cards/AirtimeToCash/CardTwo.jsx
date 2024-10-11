import { useEffect, useState } from "react";
import { checkAirtime2CashAvailbe, validateAirtimeTransfer } from "../../../Helpers/api";
import ButtonTwo from "../../Helpers/ButtonTwo";
import toast from "react-hot-toast";

function CardTwo({ formData, setFormData, setActiveCard, setSelectedCard, setTransactionData, setCardOne, setCardTwo, setCardThree }) {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ msg, setMsg ] = useState()
  const [ mobileNumber, setMobileNumber ] = useState()
  const [ mobileNetwork, setMobileNetwork ] = useState()

  useEffect(() => {
    setFormData({ ...formData, proceed: false });
}, []);

  useEffect(() => {
    const checkAirtime2Cash = async () => {
      if(isLoading){
        //console.log('first returning')
        return
      }
      try {
        setIsLoading(true)
        const res = await checkAirtime2CashAvailbe(formData)
        //console.log(res.data)
        if(res?.data){
          setMsg(res?.data.data.message)
          setMobileNumber(res?.data.data.Phone_Number)
          setMobileNetwork(res?.data.data.Network)
        }
      } catch (error) {
        
      } finally {
        setIsLoading(false)
      }
    }

    checkAirtime2Cash(); 
  }, [formData]);

  const handleValidateAirtime = async () => {
    if(!formData.transactionId){
      toast.error('Transction ID Needed')
      return;
    }
    if(isLoading){
      return
    }
    try {
      setIsLoading(true)
      const res = await validateAirtimeTransfer(formData)
      console.log('VALDATE RES', res)

      if(res.status === 406 || 500){
        setFormData({ ...formData, proceed: false })
        setSelectedCard('transactionFailed')
    }

    if(res.status === 206){
        toast.success(res.data.msg)
        setFormData({})
        setCardOne(true)
        setCardTwo(true)
        setCardThree(true)
        setActiveCard('cardThree')
        setTransactionData(res?.data?.transaction)
        setSelectedCard('transactionSuccessful')
    }

    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card3 flex flex-col">
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
                <h3 className="text-[14.5px] text-gray-70 font-normal">Amount</h3>
                <p className="text-[14.5px] font-medium text-gray-80">{formData?.amount}</p>
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
        </div>

        <div>
            {
              isLoading ? (
                <div className="flex flex-col gap-4 justify-center items-center">
                  <p className="text-[18px] text-second-color">Please wait...</p>
                  <div className='flex w-full items-center justify-center'>
                     <div className="loading-spinner flex items-center justify-center h-16 w-16 rounded-full left-0 top-0"></div>   
                  </div>
                </div>
              ) : msg ? (
                <div className="flex flex-col items-center justify-center gap-3">
                    <small className="text-error" >please Do not refresh this page</small>
                    <p className="text-gray-90 text-center font-semibold">{msg}</p>
                    <h4 className="text-gray-90 text-[18px]">Network: {mobileNetwork}</h4>
                    <h2 className="font-bold text-[20px] text-success">Transfer {formData?.amount} to {mobileNumber}</h2>

                    <ButtonTwo onClick={handleValidateAirtime} text={'I Have Transfer the Airtime'} />
                    <small className="text-error uppercase font-semibold">Only Click on the button after you have transfer the airtime</small>
                </div>
              ) : (
                ''
              )
            }
        </div>
    </div>
  )
}

export default CardTwo