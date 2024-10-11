import StarImg from '../assets/star.png'

import MtnImg from '../assets/mtn2.png'
import AirtelImg from '../assets/airtel2.png'
import GloImg from '../assets/glo2.png'
import NineMobile from '../assets/9mobile2.png'

import DstvImg from '../assets/dstv.png'
import GotvImg from '../assets/gotv.png'
import StarttimesImg from '../assets/startimes.png'
import ShowmaxImg from '../assets/showmax.png'

import JambImg from '../assets/jamb.png'
import NecoImg from '../assets/neco.png'
import WaecIMG from '../assets/waec.png'

import AedcImg from '../assets/aedc.png'
import EkedcImg from '../assets/ekedc.png'
import IeImg from '../assets/ie.png'
import EedcImg from '../assets/eedc.png'


function OurServices() {
  return (
    <div className="small-pc:pad6 pad4 w-full flex flex-col gap-[32.74px] items-center justify-center">
        <div className="flex gap-[16.37px] items-center justify-center flex-col">
          <div className='pad8 flex items-center justify-center gap-[10px] bg-gray-20 rounded-[102.32px]'>
            <img src={StarImg} alt="star" />
            <p className="text-[16px] font-normal text-gray-90">Services</p>
            <img src={StarImg} alt="star" />
          </div>
          <h2 className="text-[36.84px] font-bold text-gray-90 text-center">Your All-in-One Subscription Hub</h2>

          <p className="text-[20.46px] tablet:text-[18px] phone:text-[16px] text-gray-70 font-normal w-[80%] text-center items-center justify-center">
            Say goodbye to the hassle of multiple apps and platforms, and hello to the simplicity and convenience of managing your subscriptions with us.
          </p>
        </div>

        <div className='flex items-center justify-center gap-[24.56px] flex-wrap'>
            <div className='w-[279.34px] h-[398px] phone:w-[94%] phone:h-auto p-3 flex flex-col rounded-[24.56px] border-[1px] border-gray-30'>
                <div className='w-full bg-gray-20 p-3 rounded-[24.56px] gap-[9.2px] flex flex-col'>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={AirtelImg} alt="airtel" className='flex-1' />
                    <img src={MtnImg} alt="MTN" className='flex-1' />
                  </div>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={GloImg} alt="Glo" className='flex-1' />
                    <img src={NineMobile} alt="9mobile" className='flex-1' />
                  </div>
                </div>

                <div className='mt-8 flex flex-col gap-[7px]'>
                  <h3 className='text-[24px] text-gray-90 font-semibold'>Buy Airtime & Data</h3>
                  <p className='text-[16px] font-normal text-gray-70'>Our app lets you buy airtime and data swiftly, so you're always in touch with what matters most. </p>
                </div>
            </div>

            <div className='w-[279.34px] h-[398px] phone:w-[94%] phone:h-auto p-2 flex flex-col rounded-[24.56px] border-[1px] border-gray-30'>
                <div className='w-full bg-gray-20 p-3 rounded-[24.56px] gap-[9.2px] flex flex-col'>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={DstvImg} alt="Dstv" className='flex-1' />
                    <img src={GotvImg} alt="GoTv" className='flex-1' />
                  </div>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={StarttimesImg} alt="Startimes" className='flex-1' />
                    <img src={ShowmaxImg} alt="Showmax" className='flex-1' />
                  </div>
                </div>

                <div className='mt-8 flex flex-col gap-[7px]'>
                    <h3 className='text-[24px] text-gray-90 font-semibold'>Cable TV</h3>
                    <p className='text-[16px] font-normal text-gray-70'>Explore a world of content with our cable TV service. From the latest shows we bring it all to your screen.</p>
                </div>
            </div>

            <div className='w-[279.34px] h-[398px] phone:w-[94%] phone:h-auto p-2 flex flex-col rounded-[24.56px] border-[1px] border-gray-30'>
                <div className='w-full bg-gray-20 p-3 rounded-[24.56px] gap-[9.2px] flex flex-col'>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={NecoImg} alt="neco" className='flex-1' />
                    <img src={WaecIMG} alt="waec" className='flex-1' />
                  </div>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={JambImg} alt="jamb" className='flex-1' />
                    <img src="" alt="" className='flex-1' />
                  </div>
                </div>

                <div className='mt-8 flex flex-col gap-[7px]'>
                    <h3 className='text-[24px] text-gray-90 font-semibold'>Result Token</h3>
                    <p className='text-[16px] font-normal text-gray-70'>Get instant access to your results with our result checker token. No more waiting, no more delays.</p>
                </div>
            </div>

            <div className='w-[279.34px] h-[398px] phone:w-[94%] phone:h-auto p-2 flex flex-col rounded-[24.56px] border-[1px] border-gray-30'>
                <div className='w-full bg-gray-20 p-3 rounded-[24.56px] gap-[9.2px] flex flex-col'>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={IeImg} alt="Ikorodu Electric" className='flex-1' />
                    <img src={EkedcImg} alt="Eko Electric" className='flex-1' />
                  </div>
                  <div className='flex items-center gap-[9.2px]'>
                    <img src={AedcImg} alt="Abuja Eelctric" className='flex-1' />
                    <img src={EedcImg} alt="Enugu electric" className='flex-1' />
                  </div>
                </div>

                <div className='mt-8 flex flex-col gap-[7px]'>
                    <h3 className='text-[24px] text-gray-90 font-semibold'>Utility Bills</h3>
                    <p className='text-[16px] font-normal text-gray-70'>Pay your electricity, water, gas, and other utility bills seamlessly with just a few taps. Never miss a due date again!</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OurServices