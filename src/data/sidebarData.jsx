import {
    HomeIcon,
    ShoppingBagIcon,
    HeartIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
    CurrencyDollarIcon,
    PlusCircleIcon,
    ListBulletIcon
} from '@heroicons/react/24/outline';

export const customerSidebarData = [
    {
        title: 'Dashboard',
        path: '/customer/dashboard',
        icon: <HomeIcon className="w-5 h-5" />,
    },
    {
        title: 'My Orders',
        path: '/customer/orders',
        icon: <ShoppingBagIcon className="w-5 h-5" />,
    },
    {
        title: 'Wishlist',
        path: '/customer/wishlist',
        icon: <HeartIcon className="w-5 h-5" />,
    },
    {
        title: 'Profile',
        path: '/customer/profile',
        icon: <UserIcon className="w-5 h-5" />,
    },
    {
        title: 'Support Chat',
        path: '/customer/chat',
        icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    },
];

export const sellerSidebarData = [
    {
        title: 'Dashboard',
        path: '/user/dashboard',
        icon: <HomeIcon className="w-5 h-5" />,
    },
    {
        title: 'Add New Book',
        path: '/user/add-book',
        icon: <PlusCircleIcon className="w-5 h-5" />,
    },
    {
        title: 'My Listings',
        path: '/user/listings',
        icon: <ListBulletIcon className="w-5 h-5" />,
    },
    {
        title: 'Orders',
        path: '/user/orders',
        icon: <ShoppingBagIcon className="w-5 h-5" />,
    },
    {
        title: 'Earnings',
        path: '/user/earnings',
        icon: <CurrencyDollarIcon className="w-5 h-5" />,
    },
    {
        title: 'Profile',
        path: '/user/profile',
        icon: <UserIcon className="w-5 h-5" />,
    },
    {
        title: 'Customer Chat',
        path: '/user/chat',
        icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    },
];
