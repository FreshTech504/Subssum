import { LuPhone } from "react-icons/lu";
import { IoWifiOutline } from "react-icons/io5";
import { MdTv } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { IoNewspaperOutline } from "react-icons/io5";

export const services = [
    {
        name: 'Buy Airtime',
        link: 'quickbuy-airtime',
        icon: LuPhone
    }
    ,
    {
        name: 'Buy Data',
        link: 'quickbuy-data',
        icon: IoWifiOutline
    }
    ,
    {
        name: 'Buy Electricity',
        link: 'quickbuy-electric',
        icon: MdTv
    }
    ,
    {
        name: 'Pay Cable TV',
        link: 'quickbuy-tv',
        icon: RxLightningBolt

    }
]

export const quickLinks = [
    {
        name: 'Contact',
        link: 'contact',
        icon: IoChatbubbleEllipsesOutline
    },
    {
        name: 'FAQs',
        link: 'faq',
        icon: LuClipboardList
    },
    {
        name: 'Blogs',
        link: 'blogs',
        icon: IoNewspaperOutline
    },
]