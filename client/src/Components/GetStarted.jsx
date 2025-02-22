import { Link } from 'react-router-dom';
import DashboardImg from '../assets/dashboard.png';
import DashboardTwoImg from '../assets/dashboard2.png';

function GetStarted() {
  return (
    <div className='small-pc:pad6 pad4 overflow-hidden w-full flex flex-col gap-[32.74px] items-center justify-center'>
      <div className="w-full h-[500px] phone:h-auto phone:py-8 flex items-center justify-center overflow-hidden relative rounded-[24.56px] bg-gray-20">
        <img alt='dashboard image' src={DashboardImg} className='absolute top-[23px] left-[-5px] small-pc:left-[-6rem] tablet:left-[-12rem]' />

        <div className="w-[464.55px] phone:w-[94%] flex flex-col gap-[40px] items-center justify-center">
          <div className='flex flex-col gap-[16px]'>
            <h2 className='text-gray-90 font-bold text-[36.84px] text-center'>Get Started</h2>
            <p className='text-[20px] font-normal text-gray-70 text-center'>
              Initiating your engagement with us is a simple process. Our dedicated team is here to provide you with step-by-step guidance, ensuring that each phase of your experience is seamless and efficient. Our team is devoted to guiding you through each step of the process, ensuring that your experience is smooth and efficient. We are committed to addressing any inquiries and providing support throughout your journey. Your success is our priority.
            </p>
          </div>

          <div className='bg-[#0373DB] w-[50%] tablet:w-[90%] flex text-center items-center justify-center pt-[15px] pb-[15px] pl-[51.16px] pr-[51.16px] rounded-[10.23px]'>
            <Link to='/register' className='text-white'>
              Get Started
            </Link>
          </div>
        </div>

        <img src={DashboardTwoImg} alt="dashboard" className='absolute top-[40.93px] right-[-5px] small-pc:right-[-8rem] tablet:right-[-12rem]' />
      </div>
    </div>
  );
}

export default GetStarted;
