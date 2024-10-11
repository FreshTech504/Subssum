import { Link } from 'react-router-dom'
import StampImg from '../assets/stamp.png'

import FileImg from '../assets/file.png'
import GearImg from '../assets/gear.png'
import StartImg from '../assets/star2.png'

function IntergrateApi() {
    const data = [
        {
            img: FileImg,
            title: 'Concise API Documentation',
            text: "We've made it straightforward and user-friendly, ensuring that you can seamlessly connect to our system without hassle.",
        },
        {
            img: GearImg,
            title: 'Timely Tech Support',
            text: "Our responsive tech support team is here to help you whenever you encounter tech challenges. Quick solutions, alway",
        },
        {
            img: StartImg,
            title: 'Reliable Service Uptime',
            text: "Reliable Service, No Downtime. Count on us for uninterrupted service. We keep you connected, always.",
        }
    ]

  return (
    <div className="small-pc:pad6 pad4 w-full flex items-center gap-[20.46px] justify-between small-pc:flex-col">
        <div className="flex-1 flex h-[734px] rounded-[24.56px] relative bg-[#F6F6F6] overflow-hidden pl-5 pr-5">
            <div className='p-5 flex flex-col gap-[55.25px] w-[70%] phone:w-[100%]'>
                <div className='flex flex-col gap-[16.37px]'>
                    <h2 className='text-gray-90 font-bold text-[36.84px]'>Integrate our API</h2>
                    <p className='text-[20px] font-normal text-gray-70'>
                        Integrate our well-documented API, which allows you to build your custom payment platform and earn by serving a vast user base. Regardless of the scale or complexity of your vision, you can bring it to life.
                    </p>
                </div>
                
                <div className='bg-[#0373DB] w-[50%] tablet:w-[70%] flex items-center justify-center pt-[17.39px] pb-[17.39px] pl-[51.16px] pr-[51.16px] rounded-[10.23px]'>
                    <Link className='link text-white tet-[16px] font-semibold'>
                        Learn More
                    </Link>
                </div>
            </div>

            <img alt='stamp' src={StampImg} className='absolute bottom-[-10px] small-pc:right-[-10px] small-pc:w-[300px] tablet:w-[200px] phone:w-[160px]' />
        </div>

        <div className="flex-1 flex flex-col h-[734px] rounded-[24.56px] bg-[#F6F6F6] p-5">
            <div className='w-full flex flex-col gap-[36.84px]'>
                {
                    data.map((item, idx) => (
                        <div key={idx} className='flex flex-col gap-[16.37px]'>
                            <div className='flex items-center gap-[16.37px]'>
                                <span className='p-[8.19px] flex items-center justify-center rounded-[8.19px] bg-[#F4E7D8]'>
                                    <img src={item.img} alt={item.title} className='' />
                                </span>
                                <h3 className='text-gray-90 font-bold text-[24.56px]'>{item.title}</h3>
                            </div>

                            <div className='text-[20.46px] text-gray-70 font-normal'>
                                {item.text}
                            </div>
                        </div>
                    ))
                }
            </div>
            
            <Link className='text-second-color font-semibold text-[16px] mt-auto mb-16 small-pc:mb-0'>
                Learn More
            </Link>
        </div>

    </div>
  )
}

export default IntergrateApi