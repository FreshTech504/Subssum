import { useState } from "react"
import Navbar from "../Components/Helpers/Navbar"
import ButtonTwo from "../Components/Helpers/ButtonTwo"
import LoadingBtn from "../Components/Helpers/LoadingBtn"
import Button from "../Components/Helpers/Button"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { createNewPin } from "../Helpers/api"

function CreatePin() {
    const navigate = useNavigate()
    const [ pinInput, setPinInput ] = useState(new Array(4).fill(''))
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPin, setShowPin ] = useState(false)
    const [formData, setFormData ] = useState({})

    const handleShowPin = () => {
        setShowPin((prev) => !prev)
    }

    const handlePinCode = (e, index) => {
        if(isNaN(e.target.value)) return false;
    
        setPinInput([
          ...pinInput.map((data, indx) => (indx === index? e.target.value:data))
        ])
    
        if(e.target.value && e.target.nextSibling){
          e.target.nextSibling.focus()
        }
      }

    const handleCreatePin = async (e) => {
        e.preventDefault()
        const pinCodeLength = pinInput.join('')
        setFormData({...setFormData, pin: pinCodeLength})
        if(pinCodeLength?.length !== 4){
            toast.error('Enter Transaction Pin Code')
            return;
        }
        
        try {
            setIsLoading(true)
            if(!formData.pin){
                toast.error('Enter Pin')
                return
            }
            const res = await createNewPin(formData)
            if(res.success){
                navigate('/pin-created')
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='page1 w-full h-[100vh'>
    <Navbar showBtn={false} />

    <form onSubmit={handleCreatePin} className="flex flex-col gap-[24px] w-[500px] phone:w-[90%]">


        <div className="pad3 mt-[104px] small-pc:mt-[160px] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
            <p className="text-[24px] text-gray-70 text-center">
                Create Transaction Pin
            </p>

            <div className="flex flex-col gap-[32px]">
                <div className="flex relative w-full items-center gap-2">
                    <div className="flex items-center gap-2 w-full">
                        {
                            pinInput.map((data, i) => {
                            return <input 
                                        key={i}
                                        type={showPin ? 'text' : 'password'} 
                                        value={data} 
                                        maxLength={1} 
                                        onChange={(e) => handlePinCode(e, i)} 
                                        className="input flex-1 w-[100%] items-center text-center h-[60px] text-[20px] placeholder:text-[24px]"
                                        placeholder="*"
                                    />
                            })
                        }
                    </div>
                    <span onClick={handleShowPin}>
                        {
                        showPin ? (
                            <FaEye className="text-[20px] cursor-pointer" />
                        ) : (
                            <FaEyeSlash className="text-[20px] cursor-pointer" />
                        )
                        }
                  </span>
                </div>
                {
                    isLoading ? (
                        <LoadingBtn />
                    ) : (
                        <div className="flex flex-col gap-4">
                            <ButtonTwo onClick={handleCreatePin} text={'Submit'} />
                            <Button bg={false} link={'login'} name={'Back'} />
                        </div>
                    )
                }
            </div>
        </div>
    </form>
</div>
  )
}

export default CreatePin