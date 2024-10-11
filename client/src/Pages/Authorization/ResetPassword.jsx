import { resetPassword } from "../../Helpers/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Navbar from "../../Components/Helpers/Navbar";
import { useState } from "react";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import toast from "react-hot-toast";

function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const resetToken = path;
    const [ formData, setformData ] = useState({ resetToken: resetToken }) 
    const [ passwordVisible, setPasswordVisible ] = useState(false)
    const [ confirmPasswordVisible, setConfirmPasswordVisible ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

  const seePassword = () => {
    setPasswordVisible((prev) => !prev)
}

const seeConfirmPassword = () => {
    setConfirmPasswordVisible((prev) => !prev)
}

  const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value })
  }

  const handleResetPassword = async (e) => {
      e.preventDefault()
      if(!formData.password){
          toast.error('Enter Password')
          return
      }
      if(!formData.confirmPassword){
          toast.error('Enter Confirm Password')
          return
      }

      const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/
      if(!specialChars.test(formData.password)){
          toast.error('Password must contain at least one special character')
          return
      }

      if(formData.password.length < 6){
          toast.error('Password must be 6 characters long')
          return
      }

      if(formData.password !== formData.confirmPassword){
          toast.error('Password do not match')
          return
      }

      try {
          setIsLoading(true)
          const res = await resetPassword(formData)
          //const res = {success: true}
          if(res.success){
              toast.success(res?.data)
              navigate("/login");
          }
      } catch (error) {
          
      } finally{
          setIsLoading(false)
      }
  }

  return (
    <div className="page1 w-full h-[100vh]">
        <Navbar />

        <form className="flex flex-col gap-[24px] w-[500px] phone:w-[90%]">
            <div className="text-center">
                <p className="text-[24px] text-gray-50">Reset Password</p>
            </div>

            <div className="pad3 mt-[104px] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
                <p className="text-[24px] text-gray-70">
                    Choose a new password for your account
                </p>

                <div className="flex flex-col gap-[32px]">
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="inputGroup relative">
                            <label className="label">Password</label>
                            <input type={passwordVisible ? 'text' : 'password'} onChange={handleChange} id="password" className="input" placeholder="Gabon4351" />
                            <div onClick={seePassword} className='absolute right-[10px] bottom-[10px] text-[20px] cursor-pointer'>
                                        {
                                            passwordVisible ? (
                                                <FaEye />
                                            ) : (
                                                <FaRegEyeSlash />
                                            )
                                        }
                                    </div>
                        </div>
                        <div className="inputGroup relative">
                            <label className="label">Confirm Password</label>
                            <input type={confirmPasswordVisible ? 'text' : 'password'} onChange={handleChange} id="confirmPassword" className="input" placeholder="Gabon4351" />
                            <div onClick={seeConfirmPassword} className='absolute right-[10px] bottom-[10px] text-[20px] cursor-pointer'>
                                        {
                                            confirmPasswordVisible ? (
                                                <FaEye />
                                            ) : (
                                                <FaRegEyeSlash />
                                            )
                                        }
                                    </div>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={handleResetPassword} text={'Reset Password'} />
                        )
                    }
                </div>
            </div>
        </form>
    </div>
  )
}

export default ResetPassword