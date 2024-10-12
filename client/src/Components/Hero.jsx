import AirtimeImg from '../assets/airtime.png'
import DataImg from '../assets/data.png'
import ElectricityImg from '../assets/electricity.png'
import CableTv from '../assets/cableTV.png'
import EducationImg from '../assets/education.png'
import OthersImg from '../assets/others.png'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Button from './Helpers/Button'
import DashboardImg from '../assets/dashboardFrame.png'
import { Link } from 'react-router-dom'

function Hero() {
    const [text] = useTypewriter({
        words: ['Airtime', 'Data', 'Electricity', 'Cable Tv'],
        loop: {},
        typeSpeed: 90,
        deleteSpeed: 80,
    });

  return (
    <div className="w-full flex items-center overflow-x-hidden medium-pc:flex-col medium-pc:gap-12">
        <div className="flex medium-pc:flex-1 flex-col mr-auto">
            <div className='text-[32px] tablet:text-[24px] phone:text-[19px] font-bold flex flex-col'>
                <h2>The <span className="text-second-color">BEST</span> place to subscribe / buy</h2>
                <h2 className="text-second-color">
                    {text || 'Airtime, Data, Electricity, Cable Tv'}
                    <Cursor cursorColor='#2DAE32' className='text-success' cursorStyle='|' />
                </h2>
            </div>

            <div className="flex flex-col mt-[2rem]">
                <p className="text-gray-90 text-[16px] phone:text-[14px] mb-[1.5rem] font-normal">Buy Data, Airtime, Electric bills, Cable Tv subscription with creating an account?</p>

                <h3 className='mb-[1.5rem] font-semibold text-primary-color'>Click and Get Started Here 👇</h3>

                <div className="flex gap-4 flex-col">
                    <div className="flex items-center gap-4 phone:gap-[10px]">
                        <Link to='/quickbuy-airtime' className="flex items-center justify-center bg-gray-20 h-[178.6px] w-[178.6px] tablet:h-[99.17px] tablet:w-[99.17px] rounded-[24.56px] tablet:rounded-[15.36px]">
                            <div className="flex flex-col gap-[13.3px]">
                                <img className='phone:w-[51.19px]' src={AirtimeImg} alt="Airtime" />
                                <p className="text-[18px] phone:text-[12.51px] text-center text-gray-60 font-semibold">Airtime</p>
                            </div>
                        </Link>
                        <Link to='/quickbuy-data' className="flex items-center justify-center bg-gray-20 h-[178.6px] w-[178.6px] tablet:h-[99.17px] tablet:w-[99.17px] rounded-[24.56px] tablet:rounded-[15.36px]">
                            <div className="flex flex-col gap-[13.3px]">
                                <img className='phone:w-[51.19px]' src={DataImg} alt="Data" />
                                <p className="text-[18px] phone:text-[12.51px] text-center text-gray-60 font-semibold">Data</p>
                            </div>
                        </Link>
                        <Link to='/quickbuy-electric' className="flex items-center justify-center bg-gray-20 h-[178.6px] w-[178.6px] tablet:h-[99.17px] tablet:w-[99.17px] rounded-[24.56px] tablet:rounded-[15.36px]">
                            <div className="flex flex-col gap-[13.3px]">
                                <img className='phone:w-[51.19px]' src={ElectricityImg} alt="Electricity" />
                                <p className="text-[18px] phone:text-[12.51px] text-center text-gray-60 font-semibold">Electricity</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to='/quickbuy-tv' className="flex items-center justify-center bg-gray-20 h-[178.6px] w-[178.6px] tablet:h-[99.17px] tablet:w-[99.17px] rounded-[24.56px] tablet:rounded-[15.36px]">
                            <div className="flex flex-col gap-[13.3px]">
                                <img className='phone:w-[51.19px]' src={CableTv} alt="Cable TV" />
                                <p className="text-[18px] phone:text-[12.51px] text-center text-gray-60 font-semibold">Cable TV</p>
                            </div>
                        </Link>
                        <div className="flex items-center justify-center bg-gray-20 h-[178.6px] w-[178.6px] tablet:h-[99.17px] tablet:w-[99.17px] rounded-[24.56px] tablet:rounded-[15.36px]">
                            <div className="flex flex-col gap-[13.3px]">
                                <img className='phone:w-[51.19px]' src={EducationImg} alt="Education" />
                                <p className="text-[18px] phone:text-[12.51px] text-center text-gray-60 font-semibold">Education</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center bg-gray-20 h-[178.6px] w-[178.6px] tablet:h-[99.17px] tablet:w-[99.17px] rounded-[24.56px] tablet:rounded-[15.36px]">
                            <div className="flex flex-col gap-[13.3px]">
                                <img className='phone:w-[51.19px]' src={OthersImg} alt="Others" />
                                <p className="text-[18px] phone:text-[12.51px] text-center text-gray-60 font-semibold">Others</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-[2rem] w-[40%] phone:w-[65%]'>
                <Button link={'register'} name={'Get Started'} bg={true} />
            </div>
        </div>

        <div className='flex ml-auto medium-pc:flex-1 medium-pc:mr-auto medium-pc:w-[80%]'>
            <img alt='picture of dashboard' src={DashboardImg} className='w-[518px] medium-pc:w-[100%]' />
        </div>
    </div>
  )
}

export default Hero