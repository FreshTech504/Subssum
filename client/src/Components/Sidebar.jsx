import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoImg from '../assets/logo.png'
import { sidebarMenus } from '../Data/sidebarMenus'
import { MdLogout } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { useState } from 'react';
import { signoutUser } from '../Helpers/api';
import { signOut } from '../Redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const [ isLoading, setIsLoading ] = useState(false)
    const isActive = (path) => {
      return location.pathname === path;
    };

    const handleSignout = async () => {
        if(isLoading){
            return
        }
        try {
            setIsLoading(true)
            const res = await signoutUser()
            if(res.success){
                localStorage.removeItem('subsumtoken')
                dispatch(signOut())
                navigate('/')
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className="pad5 w-[304px] phone:w-[90%] h-[100vh] bg-gray-20 flex flex-col">
        <img src={LogoImg} alt='subsum logo' className='w-[162px] h-[31px]' />

        <div className='flex flex-col gap-[10px] w-full h-full phone:h-[80vh] overflow-y-auto mt-12'>
            {
                sidebarMenus.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                    <div key={idx} className='flex flex-col gap-4'>
                        <Link key={idx} to={item.link ? `/${item.link}` : ''} className={`w-full h-[46px] p-3 flex items-center gap-[14px] rounded-[12px] text-[16px] ${isActive(`/${item.link}`) ? 'bg-second-color text-white' : 'text-second-color'}`}>
                            <Icon className={`text-[21px] ${isActive(`/${item.link}`) ? 'text-white' : 'text-second-color'}`} />
                            {item.name}
                        </Link>
                        {
                            item.imageArray && isActive(`/${item.link}`) && (
                                <div className='flex items-center gap-2'>
                                    <div className='flex items-center gap-2'>
                                        {
                                            item.imageArray.map((item, idx) => (
                                                <div className='cursor-pointer'>
                                                    <img src={item.icon} alt={item.name} className='w-[54px] h-[40px]' />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='flex items-center cursor-pointer text-[14px] text-second-color gap-3'>
                                        More
                                        <RiArrowRightSLine />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    )
                })
            }
        </div>

        <div onClick={handleSignout} className='flex items-center gap-2 mt-auto cursor-pointer hover:text-error'>
            <MdLogout className='text-[22px] text-second-color' />
            <p className='text-[20px] text-second-color'>Logout</p>
        </div>
    </div>
  )
}

export default Sidebar