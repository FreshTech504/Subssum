import { RiDashboardFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { IoWifi } from "react-icons/io5";
import { LuTv } from "react-icons/lu";
import { RxLightningBolt } from "react-icons/rx";
import { PiNotepadLight } from "react-icons/pi";
import { PiRecycleBold } from "react-icons/pi";
import { FaHeadset } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import NineMobileImg from '../assets/9mobile2.png'
import AirtelImg from '../assets/airtel2.png'
import MtnImg from '../assets/mtn2.png'

import DstvImg from '../assets/dstv.png'
import ShowmaxImg from '../assets/showmax.png'
import StartimesImg from '../assets/startimes.png'

import IeImg from '../assets/ie.png'
import EkedcImg from '../assets/ekedc.png'
import AedcImg from '../assets/aedc.png'

export const sidebarMenus = [
    {
        name: 'Dashboard',
        link: 'dashboard',
        icon: RiDashboardFill
    },
    {
        name: 'Buy Airtime',
        link: 'buy-airtime',
        icon: FaPhoneAlt,
        imageArray: [
            {
                icon: MtnImg,
                name: 'MTN'
            },
            {
                icon: AirtelImg,
                name: 'Airtel'
            },
            {
                icon: NineMobileImg,
                name: '9Mobile'
            },
        ]
    },
    {
        name: 'Buy Data',
        link: 'buy-data',
        icon:  IoWifi,
        imageArray: [
            {
                icon: MtnImg,
                name: 'MTN'
            },
            {
                icon: AirtelImg,
                name: 'Airtel'
            },
            {
                icon: NineMobileImg,
                name: '9Mobile'
            },
        ]
    },
    {
        name: 'Tv Subscription',
        link: 'tv-subscription',
        icon: LuTv,
        imageArray: [
            {
                icon: DstvImg,
                name: 'Dstv'
            },
            {
                icon: StartimesImg,
                name: 'startimes'
            },
            {
                icon: ShowmaxImg,
                name: 'showmax'
            },
        ]
    },
    {
        name: 'Pay Electric Bill',
        link: 'pay-electric-bill',
        icon: RxLightningBolt,
        imageArray: [
            {
                icon: IeImg,
                name: 'Ibadan Electric'
            },
            {
                icon: EkedcImg,
                name: 'Eko electric'
            },
            {
                icon: AedcImg,
                name: 'Abuja electric'
            },
        ]
    },
    {
        name: 'Airtime to Cash',
        link: 'airtime-to-cash',
        icon: MdLogout,
        imageArray: [
            {
                icon: MtnImg,
                name: 'MTN'
            },
            {
                icon: AirtelImg,
                name: 'Airtel'
            },
            {
                icon: NineMobileImg,
                name: '9Mobile'
            },
        ]
    },
    {
        name: 'Transaction Histroy',
        link: 'transaction-histroy',
        icon: PiNotepadLight
    },
    {
        name: 'Help and Support',
        link: 'support',
        icon: FaHeadset
    }
]