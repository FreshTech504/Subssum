import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoImg from '../../assets/logo.png'
import { MdLogout } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signoutAdmin } from '../../Helpers/api';
import { signOut } from '../../Redux/admin/adminSlice';
import { adminSidebarMenu, allServices } from '../../Data/adminSidebarMenu';
import { MdKeyboardArrowDown } from "react-icons/md";

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
            const res = await signoutAdmin()
            if(res.success){
                localStorage.removeItem('subsumauthtoken')
                dispatch(signOut())
                navigate('/')
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className="pad5 w-[276px] phone:w-[90%] h-[100vh] bg-gray-20 flex flex-col">
        <img src={LogoImg} alt='subsum logo' className='w-[162px] h-[31px]' />

        <div className='flex flex-col gap-[10px] w-full h-full phone:h-[80vh] small-phone:h-[70vh] overflow-y-auto mt-12 scrollbar-thin'>
            {
                adminSidebarMenu.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                    <div key={idx} className='flex flex-col gap-4'>
                        <Link key={idx} to={item.link ? `/${item.link}` : ''} className={`w-full h-[46px] p-3 flex items-center gap-[14px] rounded-[12px] text-[16px] ${isActive(`/${item.link}`) ? 'bg-second-color text-white' : 'text-second-color'}`}>
                            <Icon className={`text-[21px] ${isActive(`/${item.link}`) ? 'text-white' : 'text-second-color'}`} />
                            {item.name}

                            {
                                item.moreLinks && (
                                    <MdKeyboardArrowDown className={`ml-auto text-[21px] ${isActive(`/${item.link}`) ? 'text-white' : 'text-second-color'}`} />
                                )
                            }
                        </Link>
                        {
                            item.moreLinks && isActive(`/${item.link}`) && (
                                <div className='flex items-center gap-2'>
                                    <div className='flex flex-col pl-3 items-start gap-3'>
                                        {
                                            allServices.map((item, idx) => {
                                                const Icon = item.icon
                                                return (
                                                    <Link key={idx} to={item.link ? `/${item.link}` : ''} className={`w-full h-[46px] p-3 flex items-center gap-[14px] rounded-[12px] text-[16px] ${isActive(`/${item.link}`) ? 'bg-second-color text-white' : 'text-second-color'}`}>
                                                        <Icon className={`text-[21px] ${isActive(`/${item.link}`) ? 'text-white' : 'text-second-color'}`} />
                                                        {item.name}
                                                    </Link>
                                                )
                                            })
                                        }
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