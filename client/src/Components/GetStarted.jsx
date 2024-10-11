import { Link } from 'react-router-dom'
import DashboardImg from '../assets/dashboard.png'
import DashboardTwoImg from '../assets/dashboard2.png'

function GetStarted() {
  return (
    <div className='small-pc:pad6 pad4 overflow-hidden w-full flex flex-col gap-[32.74px] items-center justify-center'>
        <div className="w-full h-[456.36px] flex items-center justify-center overflow-hidden relative rounded-[24.56px] bg-gray-20">
            <img alt='dashboard image' src={DashboardImg} className='absolute top-[23px] left-[-5px] small-pc:left-[-6rem] tablet:left-[-12rem]' />

            <div className="w-[464.55px] phone:w-[94%] flex flex-col gap-[55.25px] items-center justify-center">
                <div className='flex flex-col gap-[24.56px]'>
                    <h2 className='text-gray-90 font-bold text-[36.84px] text-center'>Get Started</h2>
                    <p className='text-[20px] font-normal text-gray-70 text-center'>
                        Getting started is simple. We're here to guide you through the process, ensuring that your journey with us is smooth and efficient.
                    </p>
                </div>

                    <div className='bg-[#0373DB] w-[50%] tablet:w-[90%] flex text-center items-center justify-center pt-[17.39px] pb-[17.39px] pl-[51.16px] pr-[51.16px] rounded-[10.23px]'>
                        <Link to='/register' className='text-white'>
                            Get Started
                        </Link>
                    </div>
            </div>

            <img src={DashboardTwoImg} alt="dashbaord" className='absolute top-[40.93px] right-[-5px] small-pc:right-[-8rem] tablet:right-[-12rem]' />

        </div>
    </div>
  )
}

export default GetStarted