import toast from "react-hot-toast"
import ButtonTwo from "../../Helpers/ButtonTwo"
import { useEffect, useState } from "react"
import { providers } from "../../../Data/serviceProviders"
import { useFetchCableTvPlans } from "../../../Helpers/fetch.hooks"
import { validateCardNumber } from "../../../Helpers/api"

function CardOne({ formData, setFormData, setActiveCard, setCardOne }) {
    const { cabletvplan, isFetchingCableTvPlans } = useFetchCableTvPlans()
    const [ availbaleBundle, setAvailableBundle] = useState([])
    const [ smartCardName, setSmartCardName ] = useState('')

    const serviceProvider = providers
    const cabletvplans = cabletvplan?.data
    //console.log('first', cabletvplan?.data)

    useEffect(() => {
        //console.log('FORM',formData)
    } , [formData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleProvideChange = (e) => {
        const value = e.target.value
        if (value === 'null') {
            setFormData({ ...formData, serviceProviderCode: '', serviceProviderName: '' })
            setAvailableBundle([])
        }
        const filterData = serviceProvider.find(provider => provider?.code === value)
        setFormData({ ...formData, serviceProviderCode: filterData?.code, serviceProviderName: filterData?.name })
        
        //filter for cable plans
        if(value){
            const filterPlans = cabletvplans?.filter(plan => plan?.platformCode.toString() === value);
            setAvailableBundle(filterPlans);
        }
    }
    
    const handleBundleChange = (e) => {
        const value = e.target.value;
        if (value === 'null') {
            setFormData({
                ...formData,
                planId: '',
                planName: '',
                amount: ''
            })
        }
        const selectedPlan = availbaleBundle?.find(plan => plan?._id === value);
        if (selectedPlan) {
            setFormData({
                ...formData,
                planId: selectedPlan?._id,
                planName: selectedPlan?.planName,
                amount: selectedPlan?.price,
                desc: `${selectedPlan.planName} for - ${selectedPlan.price}`
            })
        }
    }

    //useEffect to verify smart card name here
    useEffect(() => {
        const fetchData = async () => {
            if (formData?.smartCardNumber?.length >= 10 && formData?.serviceProviderCode) {
                try {
                    setSmartCardName('')
                    const res = await validateCardNumber({ id: formData?.serviceProviderCode, number: formData?.smartCardNumber });
                    //console.log('first', res.data.data)
                    if(res.data.data && typeof res.data.data === 'object'){
                        setSmartCardName(res.data.data.name)
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
    
        fetchData();
    }, [formData?.smartCardNumber, formData?.serviceProviderCode])

    const handleNext = () => {
        if(!formData.serviceProviderCode){
            toast.error('Select a service provider')
            return
        }
        if(!formData.smartCardNumber){
            toast.error('Enter smart card Number')
            return
        }
        if(!formData.planId){
            toast.error('Select a subscription bundle')
            return
        }
        if(!formData.email){
            toast.error('Enter email address')
            return
        }
        const timeStamp = Date.now()
        setFormData({ 
            ...formData, 
            status: 'Initiated' , 
            totalAmount: formData.amount >= 2400 && formData?.amount <= 3000 ? Math.ceil(Number(Number(formData?.amount) + ((formData?.amount * 7) / 100) )) : Math.ceil(Number(Number(formData?.amount) + ((formData?.amount * 5) / 100) )), 
            transactionId: timeStamp 
        })
        setActiveCard('cardTwo')
        setCardOne(true)
    }

    
  return (
    <div className="card3">
        <div className="flex flex-col gap-8">
            <h2 className="font-semibold text-[20px] text-gray-60 text-center">TV Subscription</h2>
            
            <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3 w-full small-phone:flex-col">
                    <div className="inputGroup w-full flex-1">
                        <label className="label text-[14px]">Select Provider</label>
                        <select onChange={handleProvideChange} className="input text-gray-60 font-semibold" id='serviceProvider'  >
                            <option value="null">-- Select Provider --</option>
                            {
                                serviceProvider.map((item, idx) => (
                                    <option disabled={item?.disabled} key={idx} className="text-gray-60 font-semibold text-[14px] flex items-center gap-[2px]" id="serviceProvider" value={item.code}>
                                        <p>{item.name}</p>
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="inputGroup w-full flex-1">
                        <label className="label text-[14px]">Smart Card Number</label>
                        <input type="text" onChange={handleChange} defaultValue={formData?.smartCardNumber} id="smartCardNumber" className="input text-[14px] text-gray-60 font-semibold" placeholder="14315422742" />
                    </div>
                </div>
                <div className="inputGroup gap-[6px]">
                        <label className="label text-[14px]">Plan</label>
                        <select onChange={handleBundleChange} className="input text-gray-60 font-semibold" id='bundleId'  >
                            <option value="null">-- Select Bundle --</option>
                            {
                                availbaleBundle?.map((item, idx) => (
                                    <option key={idx} className="text-gray-60 text-[14px] flex items-center gap-[2px]" id="bundleId" value={item._id}>
                                        <p> {item.planName} for - {item.price}</p>
                                    </option>
                                ))
                            }
                        </select>
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Amount</label>
                    <input type="number" id="amount" className="input text-[14px] text-gray-60 font-semibold bg-gray-30 border-[1px] border-[#C7DBEF]" disabled value={formData?.amount} />
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Email</label>
                    <input type="email" id="email" onChange={handleChange} className="input text-[14px] text-gray-60 font-semibold"  defaultValue={formData?.email} placeholder="email@gmail.com" />
                </div>

                {/**verifiy smart card number */}
                {
                    formData?.smartCardNumber?.length >= 10 && formData?.serviceProviderCode && smartCardName === '' && (
                        <div className="flex items-center gap-3">
                            <div className=''>
                                <div className="loading-spinner-small border-[8px] flex items-center justify-center h-[8px] w-[8px] rounded-full"></div>   
                            </div>
                            <p className="text-second-color text-[14px] font-semibold">Fetching Details...</p>
                        </div>
                    )
                }
                {
                    smartCardName && (
                        <p className="text-second-color text-[14px] font-semibold">CARD NAME: {smartCardName}</p>
                    )
                }

            </div>
        </div>

        <ButtonTwo onClick={handleNext} text={'Proceed'} />
    </div>
  )
}

export default CardOne