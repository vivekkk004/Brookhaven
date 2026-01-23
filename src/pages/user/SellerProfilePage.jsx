import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { showToast } from '../../app/features/slice/uiSlice';

const SellerProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        displayName: user?.name || 'Vivek Books Store',
        email: user?.email || 'vivek@example.com',
        bio: 'Passionate bookseller offering rare and vintage finds.',
        location: 'New York, USA',
        website: 'www.vivekbooks.com'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            dispatch(showToast({ message: 'Store profile updated! 🏪', type: 'success' }));
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
                <p className="text-gray-500">Manage your public seller profile and store details</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Store Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Display Name / Store Name</label>
                                <input
                                    type="text"
                                    value={profileData.displayName}
                                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio / About Store</label>
                                <textarea
                                    rows="3"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500"
                                    placeholder="Tell customers about your bookstore..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                                <input
                                    type="url"
                                    value={profileData.website}
                                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Contact Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <Button type="submit" variant="primary" loading={isLoading}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SellerProfilePage;
