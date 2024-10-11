import { useState } from "react"
import ButtonTwo from "../../Components/Helpers/ButtonTwo"
import LoadingBtn from "../../Components/Helpers/LoadingBtn"
import Navbar from "../../Components/Helpers/Navbar"
import { useNavigate } from "react-router-dom"
import { forgotPassword } from "../../Helpers/api"
import toast from "react-hot-toast"

function ForgotPasword() {
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ formData, setformData ] = useState({ }) 

    const handleChange = (e) => {
        setformData({...formData, [e.target.id]: e.target.value })
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        if(!formData.email){
          toast.error('Enter registered email')
          return;
        }
        try {
          setIsLoading(true)
            const res = await forgotPassword(formData)
            if(res?.success) {
              navigate("/reset-email-sent", {
                state: { resMsg: `${res?.msg}` },
              });
          } 
        } catch (error) {
            
        } finally {
          setIsLoading(false)
        }
    }
  return (
    <div className='page1 w-full h-[100vh'>
        <Navbar />

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-[24px] w-[500px] phone:w-[90%]">
            <div className="text-center">
                <p className="text-[24px] text-gray-50">Forgot Password</p>
            </div>

            <div className="pad3 mt-[104px] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
                <p className="text-[24px] text-gray-70">
                    Enter the email you used to create your account 
                </p>

                <div className="flex flex-col gap-[32px]">
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="inputGroup relative">
                            <label className="label">Email Address</label>
                            <input type='email' onChange={handleChange} id="email" className="input" placeholder="wabdotmail@gmail.com" />
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={handleForgotPassword} text={'Submit'} />
                        )
                    }
                </div>
            </div>
        </form>
    </div>
  )
}

export default ForgotPasword