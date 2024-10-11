import toast from "react-hot-toast"
import { network } from "../../../Data/networks"
import ButtonTwo from "../../Helpers/ButtonTwo"
import { useEffect, useState } from "react"
import { validatePhoneNumberAsync } from "../../../Helpers/phoneNumberValidator"

function CardOne({ formData, setFormData, setActiveCard, setCardOne }) {
    const [ numberSuccess, setNumberSuccess ] = useState()
    const [ numberError, setNumberError ] = useState([])
    const [ phoneNumberMisMatched, setPhoneNumberMisMatched ] = useState()
    const [ creditedAmount, setCreditedAmount ] = useState()
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleNetworkChange = (e) => {
        const value = e.target.value
        const filterData = networks.filter(networks => networks.code === value)
        setFormData({ ...formData, networkCode: filterData[0].code, networkName: filterData[0].name })
    }

    useEffect(() => {
        setFormData({ ...formData, proceed: false });
    }, []);
    
    useEffect(() => {
        //console.log('FORM',formData)

        if(!formData.amount || formData.amount < 100){
            setCreditedAmount()
        }

        if(formData.amount && formData.networkCode && formData.amount >= 100){
            if(formData.networkCode === '1'){
                setCreditedAmount( Number(formData.amount) - (( 35 * Number(formData.amount) ) / 100) )
            }
            if(formData.networkCode === '2'){
                setCreditedAmount( Number(formData.amount) - (( 50 * Number(formData.amount) ) / 100) )
            }
            if(formData.networkCode === '3'){
                setCreditedAmount( Number(formData.amount) - (( 50 * Number(formData.amount) ) / 100) )
            }
            if(formData.networkCode === '4'){
                setCreditedAmount( Number(formData.amount) - (( 40 * Number(formData.amount) ) / 100) )
            }
        }

    } , [formData, formData.amount, formData.networkCode])

        //VALIDATE PHONE NUMBER
        useEffect(() => {
            const validatePhoneNumber = async () => {
                if(formData.phoneNumber?.length >= 11){
                    try {
                        const result = await validatePhoneNumberAsync(formData.phoneNumber);
                        
                        if(result.telco.toLowerCase() !== formData.networkName.toLowerCase()){
                            setPhoneNumberMisMatched(`Phone number Entered is an ${result.telco} number`)
                            setNumberError()
                            setNumberSuccess()
                        } 
                        if(result.telco.toLowerCase() === formData.networkName.toLowerCase()){
                            setPhoneNumberMisMatched()
                            setNumberError()
                            setNumberSuccess(result.telco)
                        }
                        //console.log(result);
                    } catch (error) {
                        setNumberError(error?.errors)
                        setNumberSuccess()
                        setPhoneNumberMisMatched()
                        //console.error('Error validating phone number:', error);
                    }
                } 
                if(formData.phoneNumber?.length < 11 ){
                    setPhoneNumberMisMatched()
                    setNumberError()
                    setNumberSuccess()
                }
            }
    
            validatePhoneNumber()
        }, [formData.phoneNumber, formData.networkName])
    
    const handleNext = () => {
        if(!formData.networkCode){
            toast.error('Select a network')
            return
        }
        if(!formData.phoneNumber){
            toast.error('Enter Phone Number')
            return
        }
        if(!formData.amount){
            toast.error('Enter Amount')
            return
        }
        const numberRegex = /^\d+$/;
        if(!numberRegex.test(formData?.amount)){
            toast.error('Invalid amount Number format')
        }
        if(formData.amount < 100){
            toast.error('Minimium Amount is 100')
            return
        }
        if(numberError?.length > 0){
            return
        }
        const timeStamp = Date.now()
        setFormData({ ...formData, status: 'Initiated' , totalAmount: creditedAmount, transactionId: timeStamp })
        setCardOne(true)
        setActiveCard('cardTwo')
    }

    const networks = network
  return (
    <div className="card3">
        <div className="flex flex-col gap-8">
            <h2 className="font-semibold text-[20px] text-gray-60 text-center">Airtime to Cash</h2>
            
            <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3 w-full small-phone:flex-col">
                    <div className="inputGroup w-full flex-1">
                        <label className="label text-[14px]">Select Network</label>
                        <select onChange={handleNetworkChange} className="input text-gray-60 font-semibold" id='networkCode'  >
                            <option value="">-- Select Network --</option>
                            {
                                networks.map((item, idx) => (
                                    <option key={idx} className="text-gray-60 text-[14px] flex items-center gap-[2px]" id="networkCode" value={item._id}>
                                        <img alt={item.name} src={item.icon} className="w-[17px]" />
                                        <p>{item.name}</p>
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="inputGroup w-full flex-1">
                        <label className="label text-[14px]">Phone Number</label>
                        <input type="number" onChange={handleChange} defaultValue={formData?.phoneNumber} id="phoneNumber" className="input text-[14px] text-gray-60 placeholder:text-gray-60" placeholder="08094562627" />
                    </div>
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Amount</label>
                    <input type="number" onChange={handleChange} id="amount" defaultValue={formData?.amount} className="input text-[14px] text-gray-60 placeholder:text-gray-60" placeholder="₦5,000" />
                </div>
                <div className="inputGroup gap-[6px]">
                    <label className="label text-[14px]">Credited Amount</label>
                    <input type="number" id="creditedAmount" className="input text-[14px] text-gray-60 font-semibold bg-gray-30 border-[1px] border-[#C7DBEF]" disabled value={creditedAmount} />
                </div>
            </div>

            <div>
                {
                    numberError?.length > 0 ? (
                        numberError.map((e, i) => (
                            <p key={i} className="text-error text-[14px]" >{e}</p>
                        ))
                    ) : phoneNumberMisMatched ? (
                        <p className="text-warning text-[14px]">{phoneNumberMisMatched}</p>
                    ) : numberSuccess ? (
                        <p className="text-success text-[14px]">{''}</p>
                    ) : (
                        ''
                    )
                }
            </div>
        </div>

        <ButtonTwo onClick={handleNext} text={'Proceed'} />
    </div>
  )
}

export default CardOne