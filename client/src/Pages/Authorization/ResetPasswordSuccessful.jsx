import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar"
import SuccessImg from '../../assets/success.png'
import { useState } from "react";
import ButtonTwo from "../../Components/Helpers/ButtonTwo";

function ResetPasswordSuccessful() {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/login')
  }
  return (
    <div className='page1 w-full h-[100vh]'>
        <Navbar showBtn={false} />

        <div className="pad3 mt-[110px] w-[500px] h-[376px] phone:h-auto phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
            <div className="flex items-center flex-col w-full gap-[54px] phone:gap-[32px] phone:flex-col phone:items-center">
                <div>
                  <img src={SuccessImg} alt="success" className='w-[132px] h-[132px] phone:w-[74px] phone:h-[74px]' />
                </div>

                <div className="flex flex-col gap-[8px]">
                  <h2 className="text-gray-70 text-[20px] font-semibold">
                    Password reset successfully
                  </h2>

                </div>

                <div className="w-full items-center justify-center">
                <ButtonTwo onClick={handleRedirect} text={"Finish"} />
                </div>

            </div>
        </div>

    </div>
  )
}

export default ResetPasswordSuccessful