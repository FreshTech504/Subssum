import { HiArrowSmRight } from "react-icons/hi";
import { TbDeviceTabletQuestion } from "react-icons/tb";
import { PiChatsCircle } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { BiErrorCircle } from "react-icons/bi";
import { LuStar } from "react-icons/lu";

export const help = [
    {
        id: 1,
        link: '/faq',
        title: 'Frequently Asked Questions',
        text: 'See FAQ',
        img: TbDeviceTabletQuestion,
        icon: HiArrowSmRight,
        style: 'bg-[#EE5D50]',
    },
    {
        id: 2,
        //link: '/chat-live',
        title: 'Live Chat',
        text: 'Chat Now',
        img: PiChatsCircle,
        icon: HiArrowSmRight,
        style: 'bg-[#FFB547]',
    },
    {
        id: 3,
        link: 'https://whatsapp.com/channel/0029Vamiyx99xVJfJQDVhg0b',
        title: 'Whatsapp',
        text: 'Drop a Message',
        img: BsWhatsapp,
        icon: HiArrowSmRight,
        style: 'bg-[#2DAE32]',
    },
    {
        id: 4,
        link: 'tel:2347010686249',
        title: 'Phone',
        text: 'Call Us',
        img: LiaPhoneVolumeSolid,
        icon: HiArrowSmRight,
        style: 'bg-[#4169E1]',
    },
    {
        id: 5,
        link: 'https://whatsapp.com/channel/0029Vamiyx99xVJfJQDVhg0b',
        title: 'Report Our Support',
        text: 'Not Satisfied?',
        img: BiErrorCircle,
        icon: HiArrowSmRight,
        style: 'bg-[#EE5D50]',
        modal: 'reportOurSupport',
    },
    {
        id: 6,
        link: '',
        title: 'Review Our App',
        text: 'Coming Soon',
        img: LuStar,
        icon: '',
        style: 'bg-[#2DAE32]',
    }
]