import { useEffect, useState } from "react"
import BankingImg from '../../assets/M-Banking.png'
import CardImg from '../../assets/card.png'
import Loading from "./Loading"
import ButtonTwo from "../Helpers/ButtonTwo"
import toast from "react-hot-toast"
import { payWithMonnify, payWithPaystack } from "../../Helpers/api"

function FundWallet ({ setPopupBg, formData, setFormData,setSelectedCard }) {
    const [ isLoading, setIsLoading ] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ showAmount, setShowAmount ] = useState(false)

    useEffect(() => {
        setPopupBg(true)
    }, [setPopupBg])

    const handlePayWithPaystack = async () => {
        if(!formData?.amount){
            toast.error('Enter Amount')
            return
        }
        if(formData?.amount < 500){
            toast.error('Minimium Amount is 500')
            return
        }
        try {
            setIsLoading(true)
            const res = await payWithPaystack(formData) 
            if(res.status === 406){
                setSelectedCard('transactionFailed')
            }

        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

    const handlePayWithMonnify = async () => {
        if(!formData?.amount){
            toast.error('Enter Amount')
            return
        }
        if(formData?.amount < 500){
            toast.error('Minimium Amount is 500')
            return
        }
        try {
            setIsLoading(true)
            const res = await payWithMonnify(formData) 
            if(res.status === 406){
                setSelectedCard('transactionFailed')
            }

        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="w-full card2 flex flex-col gap-6">
        {
            isLoading && (
                <Loading />
            )
        }
        <h2 className="text-[20px] font-semibold text-gray-60 text-center">Fund Wallet</h2>

        <div className="flex flex-col gap-3">
            <div className="w-full bg-white flex flex-col items-center gap-[10px] border-[1px] border-l-gray-30 p-2 rounded-[10px]">
                <div onClick={() => setShowAmount((prev) => !prev)} className="w-full cursor-pointer flex items-center gap-2 border-[1px] border-l-gray-30 p-2 rounded-[10px]">
                    <img src={CardImg} alt="Fund With Bank Transfer" className="w-[34px] h-[34px]" />
                    <p className="text-[16px] font-semibold text-second-color">Fund With Bank Transfer</p>
                </div>
                {
                    showAmount && (
                        <div className="w-full" >
                            <input type="number" onChange={handleChange} id="amount" className="input w-full placeholder:text-gray-90" placeholder="Enter Amount" />
                        </div>
                    )
                }
            </div>

            <div className="w-full bg-white cursor-pointer flex items-center gap-2 border-[1px] border-l-gray-30 p-2 rounded-[10px]">
                <img src={BankingImg} alt="Fund With Bank Transfer" className="w-[34px] h-[34px]" />
                <p className="text-[16px] font-semibold text-second-color">Fund With Card</p>
            </div>

            {
                formData?.amount && (
                    <div className="flex w-full gap-2 flex-col mt-3">
                        <ButtonTwo onClick={handlePayWithPaystack} text={'Pay With Paystack'}/>
                        <ButtonTwo onClick={handlePayWithMonnify} text={'Pay with Monnify'} />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default FundWallet