import { Link, useLocation } from "react-router-dom"
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import BankImg from '../assets/bank.png'
import { useEffect, useState } from "react";

function Footer() {
    const [menu, setMenu] = useState (''); // state to track the active menu
    const location = useLocation();
  
    const isActive = (path) => {
      return location.pathname === path;
    };

    //Effect to scroll to top when the menu changes 
    useEffect(()=> {
        if(menu){
            window.scrollTo(0,0); //scroll to the top of the page
        }
    }, [menu]); //Trigger this effect when 'menu' changes 

    const menuList = [
        {
            name: 'About Us',
            link: ''
        },
        {
            name: 'Contact',
            link: 'contact'
        },
        {
            name: 'FAQs',
            link: 'faq'
        },
        {
            name: 'Blogs',
            link: 'blogs'
        }
    ]
  return (
    <div className="small-pc:pad6 pad4 pt-8 pb-8 bg-primary-color w-full relative flex flex-col">
        <div className=" flex  gap-[55.25px] mb-24 small-pc:flex-col">
            <div className="flex flex-col gap-[24.56px]">
                <h2 className="text-gray-30 font-semibold text-[20.46px]">Quick Links</h2>
                <div className="flex flex-col gap-[16.37px] text-gray-40 text-[16.37px] font-normal">
                    {
                        menuList.map((item, idx) => (
                            <Link key={idx} to={item.link ? `/${item.link}` :''} className={`${isActive(`/${item.link}`) ? 'text-white font-semibold' : ''} hover:text-white`}>
                                {item.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-[24.56px]">
                <h2 className="text-gray-30 font-semibold text-[20.46px]">Contact Us</h2>
                <div className="flex flex-col gap-[16.37px] text-gray-40 text-[16.37px] font-normal">
                    <a target="_blank" href="tel:2347010686249">0701 068 6249</a>
                    <a target="_blank" href="mailto:subssum23@gmail.com" className="text-inherit">subssum23@gmail.com</a>
                    <p>No 22, Bioye Eluwole Close</p>
                    <p>Lekki, Lagos, Lagos State Nigeria.</p>
                </div>
            </div>
            <div className="flex flex-col gap-[24.56px]">
                <h2 className="text-gray-30 font-semibold text-[20.46px]">Social Media</h2>
                <div className="flex gap-[8.19px] text-gray-40 text-[24px] font-normal">
                    <a target='_blank' href='https://www.facebook.com/Freshtechltd01' >
                        <FaFacebookF />
                    </a>
                    <a target='_blank' href='x.com/subssum_' >
                        <RiTwitterXLine />
                    </a>
                    <a target='_blank' href="Instagram.com/subssum_">
                        <FaInstagram />
                    </a>
                    <a>
                        <RiYoutubeLine />
                    </a>
                    <a target='_blank' href='https://www.linkedin.com/company/freshtech-innovations-ltd/'>
                        <CiLinkedin />
                    </a>
                </div>
            </div>
        </div>

        <hr className="absolute left-0 bottom-16 w-full border-gray-80"/>

        <p className="text-gray-40 text-[15px] font-normal mt-auto">
            &copy; copyright subssum
        </p>

        <img alt="bank" src={BankImg} className="absolute right-3 bottom-3 tablet:w-[200px] phone:w-[170px]" />
    </div>
  )
}

export default Footer