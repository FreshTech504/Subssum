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
    const [ errorResponse, setErrorResponse ] = useState()
    
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
        setErrorResponse('Enter password');
        setTimeout(() => {
            setErrorResponse();
        }, 2000);
          return
      }
      if(!formData.confirmPassword){
          setErrorResponse('Enter Confirm Password');
          setTimeout(() => {
              setErrorResponse();
          }, 2000);
          return
      }

      const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/
      if(!specialChars.test(formData.password)){
          setErrorResponse('Password must contain at least one special character');
          setTimeout(() => {
              setErrorResponse();
          }, 2000);
          return
      }

      if(formData.password.length < 6){
        setErrorResponse('Password must be 6 characters long');
        setTimeout(() => {
            setErrorResponse();
        }, 2000);
          return
      }

      if(formData.password !== formData.confirmPassword){
        setErrorResponse('Password do not match');
        setTimeout(() => {
            setErrorResponse();
        }, 2000);  
          return
      }

      try {
          setIsLoading(true)
          const res = await resetPassword(formData)
          //console.log('RESS', res)
          if(res?.data.success === false){
              setErrorResponse(res.data.data);
              setTimeout(() => {
                  setErrorResponse();
              }, 2000);
          }
          if(res?.data.success){
              toast.success(res?.data?.data)
              navigate('/reset-password-success')
              //navigate("/login");
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
                <p className="text-[24px] phone:text-[21px] text-gray-90 font-semibold">
                    Choose a new password for your account
                </p>

                <div className="flex flex-col gap-[32px]">
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="inputGroup relative">
                            <label className="label">Password</label>
                            <input type={passwordVisible ? 'text' : 'password'} onChange={handleChange} id="password" className="input  text-[14px] p-[8px] placeholder-black" placeholder="Gabon4351" />
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
                            <input type={confirmPasswordVisible ? 'text' : 'password'} onChange={handleChange} id="confirmPassword" className="input  text-[14px] p-[8px] placeholder-black" placeholder="Gabon4351" />
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

                        {/**ERROR RESPONSE */}
                        <p className="text-center text-error font-semibold">{errorResponse}</p>

                    </div>
                    {
                        isLoading ? (
                            <LoadingBtn />
                        ) : (
                            <ButtonTwo onClick={handleResetPassword} text={'Reset Password'} style={`font-medium`} />
                        )
                    }
                </div>
            </div>
        </form>
    </div>
  )
}

export default ResetPassword