import { Link, useLocation } from 'react-router-dom';
import LogoImg from '../../assets/logo.png'
import Button from './Button'
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import { quickLinks, services } from '../../Data/menu';


function Navbar({showBtn}) {
  const location = useLocation();
  const [ isOpen, setIsOpen ] = useState(false)

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="small-pc:pad6 pad4 bg-gray-10 w-full fixed top-0 left-0 flex justify-between border-b-[1px] border-b-gray-30 z-[9999]">
        <Link to='/'>
            <img src={LogoImg} alt='subsum logo' className='w-[162px] phone:w-[108px] phone:h-[25px]' />
        </Link>

        <div className='flex items-center gap-[32px]'>
          {
            showBtn ? (
            <div>
              <Button name={'Login'} link={'login'} bg={true} />
            </div>
            ) : (
              ''
            )
          }
          <div className='small-pc:hidden' >
            <Button name={'Sign Up'} link={'register'} bg={false} />
          </div>
            <div onClick={toggle} className='cursor-pointer'>
                <AiOutlineMenu className='text-second-color text-[23px] cursor-pointer' />
            </div>
        </div>

        {/**DROP DOWN */}
        <div className={`fixed flex items-center justify-center m-auto flex-col top-0 left-0 w-[100vw] h-[100vh] z-1000 opacity-0 transition-opacity duration-400 ease-in-out bg-gray-30 ${ isOpen ? 'opacity-100 top-0' : 'opacity-0 top-[-100%]'} `}>
          <div onClick={toggle} className='absolute top-6 right-12 text-[32px] font-semibold cursor-pointer' >
            <IoCloseSharp className='text-primary-color' />
          </div>

          <div className='flex items-center mt-auto mb-auto gap-[84px] justify-between w-[856px] flex-wrap tablet:flex-col tablet:gap-[24px] z-20 '>
            <div className='flex flex-col gap-[19px]'>
              <h3 className='font-bold text-[20px] text-gray-90'>Buy Services</h3>

              <div className='flex flex-col gap-3' >
                {
                  services.map((item, idx) => {
                    const Icon = item.icon
                    return (
                    <Link onClick={toggle} key={idx} to={`/${item.link}`} className={`text-gray-60 text-[16px] flex items-center gap-1 hover:text-gray-80 ${isActive(`/${item.link}`) ? 'text-gray-80 font-semibold' : ''}`}>
                      <Icon />
                      {item.name}
                    </Link>
                    )}
                  )
                }
              </div>
            </div>

            <div className='flex flex-col gap-[19px]'>
              <h3 className='font-bold text-[20px] text-gray-90'>Quick Links</h3>

              <div className='flex flex-col gap-3' >
                {
                  quickLinks.map((item, idx) => {
                    const Icon = item.icon
                    return (
                    <Link onClick={toggle} key={idx} to={`/${item.link}`} className={`text-gray-60 text-[16px] flex items-center gap-1 hover:text-gray-80 ${isActive(`/${item.link}`) ? 'text-gray-80 font-semibold' : ''}`}>
                      <Icon />
                      {item.name}
                    </Link>
                    )}
                  )
                }
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <Button name={'Login'} link={'login'} bg={true} />
              <Button name={'Sign Up'} link={'register'} bg={false} />
            </div>

          </div>

          <div className='w-full mt-auto flex items-center justify-center bg-gray-40 p-12'>
              <img src={LogoImg} alt='logo of subssum' className='w-[40%]' />
          </div>

        </div>
        {/**END OF DROPDOWN */}
    </div>
  )
}

export default Navbar