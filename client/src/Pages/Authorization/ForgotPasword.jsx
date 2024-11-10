import { useState } from "react";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import Navbar from "../../Components/Helpers/Navbar";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Helpers/api";
import toast from "react-hot-toast";

function ForgotPasword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState({});
  const [errorResponse, setErrorResponse] = useState();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorResponse('Enter registered email');
      setTimeout(() => {
          setErrorResponse();
      }, 2000);  
      return;
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
    <div className="page1 w-full h-[100vh">
      <Navbar />

      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col gap-[24px] w-[500px] phone:w-[90%]"
      >
        <div className="text-center mt-[90px]">
          <p className="text-[20px] text-gray-50 font-semibold">Reset Password</p>
        </div>

        <div className="pad3 mt-[2px] bg-white rounded-[10px] flex flex-col gap-[16px] border-[1px] border-gray-30">
          <p className="text-[16px] text-gray-70 text-left">
            Enter the email you used to create your account
          </p>

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col w-full gap-[12px]">
              <div className="inputGroup relative">
                <label className="label text-[14px]">Email Address</label>
                <input
                  type="email"
                  onChange={handleChange}
                  id="email"
                  className="input text-[14px] p-[8px] placeholder-black"
                  placeholder="wabdotmail@gmail.com"
                />
              </div>

              {/**ERROR RESPONSE */}
              <p className="text-center text-error font-semibold">
                {errorResponse}
              </p>

            </div>


            {isLoading ? (
              <LoadingBtn />
            ) : (
              <ButtonTwo onClick={handleForgotPassword} text={"Submit"} />
            )}
          </div>
        </div>
      </form>
    </div>
    
  );
}

export default ForgotPasword;
