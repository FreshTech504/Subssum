import { useEffect, useState } from "react"
import Sidebar from "../Components/Sidebar"
import TopNav from "../Components/TopNav"
import CardOne from "../Components/Cards/BuyAirtime/CardOne"
import CardThree from "../Components/Cards/BuyAirtime/CardThree"
import CardTwo from "../Components/Cards/BuyAirtime/CardTwo"
import toast from "react-hot-toast"
import Loading from "../Components/Modals/Loading"
import { buyAirtime } from "../Helpers/api"
import { signInSuccess } from "../Redux/user/userSlice"
import { useDispatch } from "react-redux"

function BuyAirtime({toggleMenu, showMenu, setSelectedCard, formData, setFormData}) {
    const dispatch = useDispatch()
    const [ activeCard, setActiveCard ] = useState('cardOne')
    const [ cardOne, setCardOne ] = useState(false)
    const [ cardTwo, setCardTwo ] = useState(false)
    const [ cardThree, setCardThree ] = useState(false)
    const [ transactionData, setTransactionData ] = useState()
 
    const [ isLoading, setIsLoading ] = useState(false)

    const handleCardOne = () => {
        setCardTwo(false)
        setCardThree(false)
        setActiveCard('cardOne')
    }

    // const handleCardTwo = () => {
    //     if(!formData.networkCode){
    //         toast.error('Select a network')
    //         return
    //     }
    //     if(!formData.phoneNumber){
    //         toast.error('Enter Phone Number')
    //     }
    //     if(!formData.amount){
    //         toast.error('Enter Amount')
    //         return
    //     }
    //     setCardOne(true)
    //     setActiveCard('cardTwo')
    // }

    const handleCardTwo = () => {
        const phoneRegex = /^[0-9]{11}$/;  // Phone number must be exactly 11 digits
        const amountRegex = /^[0-9]+$/;     // Amount must be a positive number
    
        if (!formData.networkCode) {
            toast.error('Select a network');
            return;
        }
    
        if (!formData.phoneNumber) {
            toast.error('Enter Phone Number');
            return;
        }
    
        if (!phoneRegex.test(formData.phoneNumber)) {
            toast.error('Phone Number must be 11 digits and contain only numbers');
            return;
        }
    
        if (!formData.amount) {
            toast.error('Enter Amount');
            return;
        }
    
        // Validate the amount to ensure it contains only numbers
        if (!amountRegex.test(formData.amount)) {
            toast.error('Amount must contain only numbers');
            return;
        }
    
        // If all validations pass, proceed with the next steps
        setCardOne(true);
        setActiveCard('cardTwo');
    };

      // Restrict the input in the amount field in real-time
    const handleAmountChange = (e) => {
        const inputValue = e.target.value;
        // Only allow numeric input, replacing any non-numeric characters with an empty string
        const numericValue = inputValue.replace(/[^0-9]/g, ''); 

        setFormData({ ...formData, amount: numericValue });
    };
    

    useEffect(() => {
        const handleAirtimePurchase = async () => {
            if (formData.proceed) {
                setSelectedCard(null);
                setIsLoading(true);
    
                try {
                    const res = await buyAirtime(formData);
                    //console.log('BUY Airtime', res)
                    if(res.status === 406 || 500){
                        setFormData({ ...formData, proceed: false })
                        setSelectedCard('transactionFailed')
                    }

                    if(res.status === 206){
                        toast.success(res.data.msg)
                        dispatch(signInSuccess(res?.data?.data))
                        setFormData({})
                        setCardOne(true)
                        setCardTwo(true)
                        setCardThree(true)
                        setActiveCard('cardThree')
                        setTransactionData(res?.data?.transaction)
                        setSelectedCard('transactionSuccessful')
                    }

                    // HANDLE CARD THREE SHOULD ONLY COME AFTER API CALL
    
                } catch (error) {
                } finally {
                    setIsLoading(false);
                }
            }
        };
    
        handleAirtimePurchase(); 
    }, [formData]);
    

  return (
            <div className="flex w-full min-h-[100vh]">
                {
                    isLoading && (
                        <Loading />
                    )
                }
                <div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
                    <div className='fixed w-[304px] left-0 top-0 flex h-full'>
                        <Sidebar />
                    </div>
                </div>

                <div className='relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto'>
                    <div className="w-[96%] phone:w-[96%]">
                        <div className="mt-6">
                            <TopNav toggleMenu={toggleMenu} showMenu={showMenu} title={'Buy Airtime'} />
                        </div>
                        
                        <div className="flex items-center justify-center w-full small-pc:flex-col">
                            {/**Card */}
                            <div className="w-[500px] phone:w-[90%] mt-8 flex flex-col gap-[54px]">
                                <div className="w-full flex gap-2">
                                    <div onClick={handleCardOne} className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]">
                                        <p className={`text-[14px] ${activeCard === 'cardOne' ? 'text-second-color' : cardOne ? 'text-success' : 'text-gray-30'}`}>Fill info</p>
                                        <span className={`w-full h-[7px] rounded-[100px] ${activeCard === 'cardOne' ? 'bg-second-color' : cardOne ? 'bg-success' : 'bg-gray-30' }`}></span>
                                    </div>
                                    <div onClick={handleCardTwo} className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]">
                                        <p className={`text-[14px] ${activeCard === 'cardTwo' ? 'text-second-color' : cardTwo ? 'text-success' : 'text-gray-30'}`}>Make Payment</p>
                                        <span className={`w-full h-[7px] rounded-[100px] ${activeCard === 'cardTwo' ? 'bg-second-color' : cardTwo ? 'bg-success' : 'bg-gray-30' }`}></span>
                                    </div>
                                    <div className="flex flex-col flex-1 cursor-pointer text-center gap-[8px]">
                                        <p className={`text-[14px] ${activeCard === 'cardThree' ? 'text-success' : cardThree ? 'text-success' : 'text-gray-30'}`}>View Receipt </p>
                                        <span className={`w-full h-[7px] rounded-[100px] ${activeCard === 'cardThree' ? 'bg-success' : cardThree ? 'bg-success' : 'bg-gray-30' }`}></span>
                                    </div>
                                </div>

                                <div>
                                    {
                                        activeCard === 'cardOne' && (
                                            <CardOne setActiveCard={setActiveCard} setCardOne={setCardOne} formData={formData} setFormData={setFormData} />
                                        )
                                    }
                                    {
                                        activeCard === 'cardTwo' && (
                                            <CardTwo setActiveCard={setActiveCard} formData={formData} setFormData={setFormData} setIsLoading={setIsLoading} setSelectedCard={setSelectedCard} />
                                        )
                                    }
                                    {
                                        activeCard === 'cardThree' && (
                                            <CardThree setActiveCard={setActiveCard} formData={formData} setFormData={setFormData} transactionData={transactionData} />
                                        )
                                    }
                                </div>
                            </div>
                            {/**END OF CARD */}
                        </div>

                    </div>
                </div>
            </div>
  )
}

export default BuyAirtime