import { Link, useLocation } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import EnvelopImg from '../../assets/envelop.png'

function ResetEmailSent() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg :  'We have sent an email with password reset information to you' ;
    //const msg = 'We have sent an email with password reset information to you' ;

    return (
      <div className='page1 w-full h-[100vh]'>
          <Navbar />

            <h1 className="text-gray-50 text-[24px] mt-[110px]">Reset Password</h1>
          <div className="pad3 mt-[20px] w-[500px] phone:w-[90%] bg-white rounded-[12px] flex flex-col gap-[24px] border-[1px] border-gray-30">
              <div className="flex items-center w-full gap-[24px]">
                  <div>
                    <img src={EnvelopImg} alt="envelop" className='w-[200px] h-[113.5px]' />
                  </div>
  
                  <div className="flex flex-col gap-[16px]">
                    <h2 className="text-gray-70 text-[24px]">
                      Check Your Email
                    </h2>
  
                    <p className="text-gray-80 text-[16px]">
                        {msg}
                    </p>
                  </div>
              </div>
          </div>

      </div>
    )
}

export default ResetEmailSent