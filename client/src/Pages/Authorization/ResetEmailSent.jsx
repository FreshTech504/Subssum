import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import EnvelopImg from '../../assets/envelop.png'
import toast from "react-hot-toast";
import { forgotPassword } from "../../Helpers/api";
import { useState } from "react";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";

function ResetEmailSent() {
    const location = useLocation();
    const navigate = useNavigate()
    //const msg = location.state ? location.state.resMsg :  'We have sent an email with password reset information to you' ;
    const msg = 'We have sent an email with password reset information to' ;
    const email = location?.state
    console.log('EMAIL', email)

    const [formData, setformData] = useState({ email: email?.resMsg });
    const [isLoading, setIsLoading] = useState(false);
    const [errorResponse, setErrorResponse] = useState();


    const handleForgotPassword = async (e) => {
      e.preventDefault();
      if (!formData.email) {
        toast.error('Enter your Email')
        navigate('/forgot-password')
      }
      try {
        setIsLoading(true);
        const res = await forgotPassword(formData);
        console.log("RES", res);
        if(res?.data.success === false){
          setErrorResponse(res?.data.data);
          setTimeout(() => {
              setErrorResponse();
          }, 2000);  
          return;
        }
        if (res?.data.success) {
          toast.success(res?.data?.msg)
          navigate("/reset-email-sent", {
            state: { resMsg: `${res?.data.data}` },
          });
        }
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="page1 w-full h-[100vh]">
  <Navbar />

  <h1 className="text-gray-50 text-[24px] mt-[110px] font-semibold">Reset Password</h1>

  <div className="pad3 mt-[20px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
    <div className="flex flex-col items-center w-full gap-[16px]">
      {/* Envelope and text content */}
      <div className="flex flex-col items-center phone:items-start gap-[16px]">
        <img src={EnvelopImg} alt="envelop" className="w-[150px] small-phone:w-[120px]" />
        <div className="flex flex-col items-start">
          <h2 className="text-gray-50 text-[24px]">Check Your Email</h2>
          <p className="text-gray-80 text-[16px] text-start">
            {msg}
            <br />
            <span className="font-semibold text-gray-70">{email?.resMsg}</span>
          </p>
        </div>
      </div>
    </div>

                  {/**ERROR RESPONSE */}
                  <p className="text-center text-error font-semibold">
                {errorResponse}
              </p>

    {isLoading ? (
              <LoadingBtn />
            ) : (
              <ButtonTwo onClick={handleForgotPassword} text={"Resend Email"} />
            )}
  </div>
</div>

    )
}

export default ResetEmailSent