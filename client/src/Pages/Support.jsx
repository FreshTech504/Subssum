import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import TopNav from '../Components/TopNav'
import { help } from '../Data/helpAndSupport'
import { useEffect } from 'react';
import { loadTawkTo, openTawkChat } from '../Components/Helpers/Tawk';

function Support({toggleMenu, showMenu}) {

    useEffect(() => {
        loadTawkTo();
      }, []);
    
  return (
    <div className="flex w-full min-h-[100vh]">
        <div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
            <div className='fixed w-[304px] left-0 top-0 flex h-full'>
                <Sidebar />
            </div>
        </div>

        <div className='relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto'>
            <div className="w-[94%] phone:w-[96%]">
                <div className="mt-6">
                    <TopNav toggleMenu={toggleMenu} showMenu={showMenu} title={'Help And Support'} />
                </div>

                <div className="small-pc:flex-col ">
                    <div className='mt-12 grid grid-cols-2 gap-5 tablet:grid-cols-1 phone:flex phone:flex-col phone:gap-4 phone:items-center phone:justify-center' >
                        {
                            help.map((item) => {
                                const Img = item.img
                                const Icon = item.icon
                                return (
                                    <div key={item.id} onClick={ item?.id === 2 ? openTawkChat : ''} className='rounded-[24px] border-[1px] w-[340px] phone:w-[320px] small-phone:w-[95%] p-3 flex items-center gap-[14px] border-gray-30'>
                                        <div className={`${item.style} w-[66px] h-[66px] rounded-[18px] flex items-center justify-center`}>
                                            <Img className='text-white text-[24px]' />
                                        </div>

                                        <div className='flex flex-col gap-[9px]'>
                                            <h2 className='font-semibold text-[16px] text-gray-60'>
                                                {item.title}
                                            </h2>

                                            <Link to={item.link ? `${item.link}` : ''} className='flex items-center gap-2'>
                                                <p className='font-bold text-[16px] text-second-color'>{item.text}</p>
                                                {
                                                    item.icon && (
                                                        <Icon className='text-second-color' />
                                                    )
                                                }
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Support