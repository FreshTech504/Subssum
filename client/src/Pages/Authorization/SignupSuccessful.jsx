import { Link, useLocation } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar"
import EnvelopImg from '../../assets/envelop.png'
import { useState } from "react";

function SignupSuccessful() {
  const location = useLocation();
  const msg = 'An email has been Sent to your account for confirmation. Please click the link to finalize your account setup successfully';  

  return (
    <div className='page1 w-full h-[100vh]'>
        <Navbar showBtn={false} />

        <div className="pad3 mt-[110px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
            <div className="flex items-center w-full gap-[16px] phone:flex-col  phone:flex-row phone:items-center">
                <div>
                  <img src={EnvelopImg} alt="envelop" className='w-[120px] h-[80px] phone:h-[70px] phone:w-[100px]' />
                </div>

                <div className="flex flex-col gap-[8px]">
                  <h2 className="text-gray-70 text-[20px]  phone:text-[18px]">
                    Check Your Email
                  </h2>

                  <p className="text-gray-80 text-[14px] phone:text-[13px]">
                      {msg}
                  </p>
                </div>

            </div>
            {/**
            <p className="font-semibold text-[14px] text-center text-second-color">{servermsg ? servermsg : ''}</p>
             * 
             */}
        </div>

    </div>
  )
}

export default SignupSuccessful