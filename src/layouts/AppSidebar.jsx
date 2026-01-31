import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { customerSidebarData, sellerSidebarData } from '../data/sidebarData';

const AppSidebar = ({ role, isOpen, onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const sidebarItems = role === 'customer' ? customerSidebarData : sellerSidebarData;

    const sidebarVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '-100%', opacity: 0 },
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <motion.aside
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 
                    lg:!translate-x-0 lg:static lg:h-[calc(100vh-64px)] lg:shadow-none lg:!opacity-100
                    shadow-xl overflow-y-auto pt-16 lg:pt-4
                `}
            >
                <div className="px-4 py-2 mb-6 lg:hidden">
                    <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                </div>

                {/* User Info (Mobile Only) */}
                <div className="lg:hidden px-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-kindle-100 flex items-center justify-center text-kindle-600 font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="px-2 space-y-1">
                    {sidebarItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? 'bg-kindle-50 text-kindle-700 shadow-sm ring-1 ring-kindle-200'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                        >
                            {/* Icon Wrapper to ensure consistency */}
                            <span className="w-5 h-5">
                                {item.icon}
                            </span>
                            <span>{item.title}</span>
                            {/* Optional: Add badge if needed */}
                        </NavLink>
                    ))}
                </nav>
            </motion.aside>
        </>
    );
};

export default AppSidebar;