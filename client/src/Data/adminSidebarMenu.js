import { RiDashboardFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { IoWifi } from "react-icons/io5";
import { LuTv } from "react-icons/lu";
import { RxLightningBolt } from "react-icons/rx";
import { PiNotepadLight } from "react-icons/pi";
import { PiRecycleBold } from "react-icons/pi";
import { FaHeadset } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

import { GoPeople } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { PiGearBold } from "react-icons/pi";
import { LuBellRing } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdPostAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export const adminSidebarMenu = [
    {
        name: 'Dashboard',
        link: 'admin-dashboard',
        icon: RiDashboardFill
    },
    {
        name: 'Transactions Histroy',
        link: 'all-transactions',
        icon: PiNotepadLight,
    },
    {
        name: 'User',
        link: 'all-users',
        icon:  GoPeople,
    },
    {
        name: 'Services',
        link: 'services',
        icon: CiStar,
        moreLinks: true,
        allServices: [
            {
                name: 'Airtime',
                link: 'admin-airtime',
                icon: FaHeadset
            },
            {
                name: 'Data',
                link: 'admin-data',
                icon: FaHeadset
            },
            {
                name: 'Help and Support',
                link: 'support',
                icon: FaHeadset
            }
        ]
    },
    {
        name: 'Payout',
        link: 'payout-request',
        icon: FaMoneyCheckDollar,
    },
    {
        name: 'Sales analysis',
        link: 'sales-analysis',
        icon: FaChartLine,
    },
    {
        name: 'Site settings',
        link: 'site-settings',
        icon: PiGearBold
    },
    {
        name: 'Notifications',
        link: 'notifications',
        icon: LuBellRing
    },
    {
        name: 'Admin user',
        link: 'admin-control',
        icon: GrUserAdmin
    },
    {
        name: 'Help and Support',
        link: 'help-and-support',
        icon: RiCustomerService2Fill
    },
    {
        name: 'Blog',
        link: 'view-blogs',
        icon: MdPostAdd
    },
    {
        name: 'My Profile',
        link: 'admin-profile',
        icon: CgProfile
    }
]
