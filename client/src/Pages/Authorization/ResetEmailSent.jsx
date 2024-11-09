import { Link, useLocation } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import EnvelopImg from '../../assets/envelop.png'

function ResetEmailSent() {
    const location = useLocation();
    //const msg = location.state ? location.state.resMsg :  'We have sent an email with password reset information to you' ;
    const msg = 'We have sent an email with password reset information to' ;
    const email = location?.state
    console.log('EMAIL', email)
    return (
      <div className="page1 w-full h-[100vh]">
  <Navbar />

  <h1 className="text-gray-50 text-[24px] mt-[110px]">Reset Password</h1>

  <div className="pad3 mt-[20px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
    <div className="flex flex-col items-center w-full gap-[16px]">
      {/* Envelope and text content */}
      <div className="flex flex-col items-center gap-[16px]">
        <img src={EnvelopImg} alt="envelop" className="w-[150px] small-phone:w-[120px]" />
        <div className="flex flex-col items-center">
          <h2 className="text-gray-50 text-[24px]">Check Your Email</h2>
          <p className="text-gray-80 text-[16px] text-center">
            {msg}
            <br />
            <span className="font-semibold text-gray-70">{email?.resMsg}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default ResetEmailSent