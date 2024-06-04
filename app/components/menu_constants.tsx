
import { SideNavItemGroup } from "@/types";
import { BsEnvelope, BsFillChatQuoteFill, BsGear, BsHouseDoor, BsKanban, BsListUl, BsQuestion } from "react-icons/bs";
export const SIDENAV_ITEMS: SideNavItemGroup[] = [
    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Sections',
                path: '/sections',
                icon: <BsKanban size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'All', path: '/sections' },
                    { title: 'New', path: '/sections/new' },
                ],
            },
            {
                title: 'Products',
                path: '/product',
                icon: <BsKanban size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'All', path: '/product' },
                    { title: 'New', path: '/product/new' },
                ],
            },
            {
                title: 'Orders',
                path: '/orders',
                icon: <BsListUl size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'All', path: '/orders' },
                    { title: 'History', path: '/orders/history' },
                ],
            },
            {
                title: 'Faqs',
                path: '/faq',
                icon: <BsFillChatQuoteFill size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'All', path: '/faq' },
                    { title: 'New', path: '/faq/new' },
                ],
            },
            {
                title: 'User Questions',
                path: '/userQuestion',
                icon: <BsQuestion size={20} />,
            },
            {
                title: 'Feedbacks',
                path: '/feedbacks',
                icon: <BsEnvelope size={20} />,
            },
           
        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Settings',
                path: '/settings',
                icon: <BsGear size={20} />,
            },
        ]
    }
];