import { Link } from "react-router-dom"
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import LogoImg from '../assets/logo.png'
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function TopNav({toggleMenu, showMenu, title}) {
    const { currentUser } = useSelector((state) => state.subSubUser);
    const user = currentUser?.data
  return (
    <div className="flex w-full flex-col gap-3 relative">
        <div className="hidden medium-pc:flex medium-pc:items-center medium-pc:justify-between">
            <img src={LogoImg} alt='subsum logo' className='w-[162px] phone:w-[108px] phone:h-[25px]' />
            
            <div onClick={toggleMenu}>
                <AiOutlineMenu className="text-second-color text-[23px] cursor-pointer" />
            </div>
        </div>
        {/**SIDEBAR */}
        <div onClick={toggleMenu} className={`${showMenu ? 'z-[100] w-full h-[100vh] fixed top-0 left-0 bg-gray-100-opa' : 'hidden'}`}>
            <div className="z-[102] h-full">
                <Sidebar />
            </div>
        </div>
        <div className="w-full flex items-center justify-between">
            <div className="text-[20px] font-semibold phone:text-[14px] text-gray-90">
                {title}
            </div>

            <div className="flex items-center gap-[8px]">
                <Link className="text-second-color phone:hidden">
                    Upgrade To Merchant
                </Link>

                <Link className="w-[32px] h-[32px] flex items-center justify-center border-[1.92px] rounded-[22.4px] border-gray-30 bg-gray-20">
                    <IoNotificationsOutline className="text-second-color" />
                </Link>

                <Link to='/profile' className="w-[32px] h-[32px] flex items-center justify-center border-[1.92px] rounded-[22.4px] border-gray-30 bg-gray-20">
                    <MdOutlinePersonOutline className="text-second-color" />
                </Link>
            </div>  
        </div>
    </div>
  )
}

export default TopNav