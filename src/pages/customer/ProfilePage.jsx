import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { showToast } from '../../app/features/slice/uiSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    // Form States
    const [activeTab, setActiveTab] = useState('personal');
    const [isLoading, setIsLoading] = useState(false);

    // Initial mock data based on user
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Vivek Kumar',
        email: user?.email || 'vivek@example.com',
        phone: '+91 9876543210',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const categories = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'security', label: 'Security' },
        { id: 'addresses', label: 'Saved Addresses' },
        { id: 'payments', label: 'Payment Methods' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            dispatch(showToast({ message: 'Profile updated successfully!', type: 'success' }));
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-500">Manage your profile updates and security</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="md:flex">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6">
                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === cat.id
                                            ? 'bg-white text-kindle-700 shadow-sm ring-1 ring-gray-200'
                                            : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 md:p-8">
                        <form onSubmit={handleSubmit}>
                            {activeTab === 'personal' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Personal Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500 bg-gray-50 hover:bg-white transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                disabled
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                                        <div className="w-16 h-16 rounded-full bg-kindle-100 flex items-center justify-center text-2xl font-bold text-kindle-600">
                                            {profileData.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Profile Picture</h3>
                                            <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                        <button type="button" className="ml-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                                            Upload New
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'security' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Change Password</h2>

                                    <div className="max-w-md space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {(activeTab === 'personal' || activeTab === 'security') && (
                                <div className="mt-8 pt-6">
                                    <Button type="submit" variant="primary" loading={isLoading}>
                                        Save Changes
                                    </Button>
                                </div>
                            )}

                            {/* Placeholders for Other Tabs */}
                            {(activeTab === 'addresses' || activeTab === 'payments') && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 italic">This section is under development.</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
