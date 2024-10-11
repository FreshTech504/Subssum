import toast from "react-hot-toast"
import ButtonTwo from "../../Helpers/ButtonTwo"
import { useEffect, useState } from "react"
import { electricProviders, meterType } from "../../../Data/electricProviders"
import { validateMeterNumber } from "../../../Helpers/api"

function CardOne({ formData, setFormData, setActiveCard, setCardOne }) {
    const [ meterName, setMeterName ] = useState('') 
    const [ metereValid, setMeterValid ] = useState('') 

    const meterTypeUsed = meterType
    const providers = electricProviders

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    useEffect(() => {
        //console.log('FORM',formData)
    } , [formData])

    const handleMeterChange = (e) => {
        const value = e.target.value;

         // Regex to ensure only positive numbers are accepted
         const amountRegex = /^[0-9]*$/;

         // Check if the input matches the regex
    if (amountRegex.test(value)) {
        // Update formData only if the value is valid
        setFormData({ ...formData, amount: value });
    } else {
        // Optionally, you can give feedback to the user here if needed
        toast.error('Amount must be a positive number');
    }
        const filterData = meterTypeUsed.find(meterType => meterType.code === value);
        if (filterData) {
            setFormData({ ...formData, meterType: filterData.name });
        }
    };

    const handleElectricProviderChange = (e) => {
        const value = e.target.value
        const filterElectricProvider = providers.find(provider => provider._id === value)
        if(filterElectricProvider){
            setFormData({
                ...formData, 
                providerName: filterElectricProvider.name,
                providerCode: filterElectricProvider.code,
                providerSlug: filterElectricProvider.slug
            });
        }
    };
    
        //useEffect to verify smart card name here
        useEffect(() => {
            const fetchData = async () => {
                if (formData?.meterNumber?.length >= 10 && formData?.providerSlug) {
                    try {
                        setMeterName('')
                        const res = await validateMeterNumber({ providerSlug: formData?.providerSlug, meterNumber: formData?.meterNumber });
                        //console.log('first', res.data.data)
                        if(res.data.data && typeof res.data.data === 'object'){
                            setMeterName(res.data.data.name)
                            setMeterValid(res.data.data.invalid)
                        }
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                }
            };
        
            fetchData();
        }, [formData?.meterNumber, formData?.providerSlug])

    const handleNext = () => {
        if(!formData.meterNumber){
            toast.error('Enter Meter Number')
            return
        }
        if(!formData.meterType){
            toast.error('Select Meter Type')
            return
        }
        if(!formData.providerCode){
            toast.error('Select Electric Provider')
            return
        }
        if(!formData.amount){
            toast.error('Enter Amount')
            return
        }
        //validate that the amount is a number 
        const amountRegex = /^[0-9]+$/; //Regex to match positive integer 
        if (!amountRegex.test(formData.amount)){
            toast.error('Amount must be a positive number');
            return;
        }
        if(formData.amount < 1000){
            toast.error('minimium anount is NGN 1000')
            return
        }
        if(!formData.phoneNumber){
            toast.error('Enter phone number')
            return
        }
        if(!formData.email){
            toast.error('Enter Email')
            return
        }
        const timeStamp = Date.now()
        setFormData({ 
            ...formData, 
            status: 'Initiated' , 
            totalAmount: formData.amount >= 2400 && formData?.amount <= 3000 ? Math.ceil(Number(Number(formData?.amount) + ((formData?.amount * 7) / 100) ) + 100) : Math.ceil(Number(Number(formData?.amount) + ((formData?.amount * 5) / 100) ) + 100), 
            transactionId: timeStamp 
        })
        setCardOne(true)
        setActiveCard('cardTwo')
    }

    
  return (
    <div className="card3">
        <div className="flex flex-col gap-8">
            <h2 className="font-semibold text-[20px] text-gray-60 text-center">Electric Bill</h2>
            
            <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3 w-full small-phone:flex-col">
                    <div className="inputGroup w-full flex-1">
                        <label className="label text-[14px]">Meter Number</label>
                        <input type="text" onChange={handleChange} id="meterNumber" defaultValue={formData?.meterNumber} className="input text-[14px] placeholder:text-gray-60 text-gray-60 font-semibold" placeholder="14315422742" />
                    </div>
                    <div className="inputGroup w-full flex-1">
                        <label className="label text-[14px]">Meter Type</label>
                        <select onChange={handleMeterChange} className="input text-gray-60 font-semibold" id='meterType'  >
                            <option value="">-- Select Type --</option>
                            {
                                meterTypeUsed.map((item, idx) => (
                                    <option key={idx} className="text-gray-60 text-[14px] flex items-center gap-[2px]" id="meterType" value={item.code}>
                                        <p>{item.name}</p>
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Provider</label>
                    <select onChange={handleElectricProviderChange} className="input text-gray-60 font-semibold" id='electricProvider'  >
                        <option value="">-- Select Provider --</option>
                        {
                            providers.map((item, idx) => (
                                <option key={idx} className="text-gray-60 text-[14px] flex items-center gap-[2px]" id="electricProvider" value={item._id}>
                                    <p>{item.name}</p>
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Amount</label>
                    <input type="number" onChange={handleChange} id="amount" defaultValue={formData?.amount} className="input text-[14px] placeholder:text-gray-60 text-gray-60 font-semibold" placeholder="₦5,000" />
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Phone Number</label>
                    <input type="text" onChange={handleChange} id="phoneNumber" defaultValue={formData?.phoneNumber} className="input text-[14px] placeholder:text-gray-60 text-gray-60 font-semibold" placeholder="07032529431" />
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Email Address</label>
                    <input type="email" onChange={handleChange} id="email" defaultValue={formData?.email} className="input text-[14px] placeholder:text-gray-60 text-gray-60 font-semibold" placeholder="email@gmail.com" />
                </div>

                {/**verifiy meter number */}
                {
                    formData?.meterNumber?.length >= 10 && formData?.providerCode && meterName === '' && (
                        <div className="flex items-center gap-3">
                            <div className=''>
                                <div className="loading-spinner-small border-[8px] flex items-center justify-center h-[8px] w-[8px] rounded-full"></div>   
                            </div>
                            <p className="text-second-color text-[14px] font-semibold">Fetching Details...</p>
                        </div>
                    )
                }
                {
                    meterName && (
                        <p className={`${metereValid ? 'text-error' : 'text-second-color'} text-[14px] font-semibold`}>METER NAME: {meterName.trim()}</p>
                    )
                }


            </div>
        </div>

        <ButtonTwo onClick={handleNext} text={'Proceed'} />
    </div>
  )
}

export default CardOne