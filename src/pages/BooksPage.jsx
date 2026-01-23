import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setFilters } from '../app/features/slice/booksSlice';
import { addToWishlist } from '../app/features/slice/wishlistSlice';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/books/BookCard';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import Input from '../components/ui/Input';
import { showToast } from '../app/features/slice/uiSlice';

const BooksPage = () => {
    const dispatch = useDispatch();
    const { books, loading, filters } = useSelector((state) => state.books);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchBooks(filters));
    }, [dispatch, filters]);

    const handleWishlist = async (bookId) => {
        if (!isAuthenticated) {
            dispatch(showToast({ message: 'Please login to add to wishlist', type: 'warning' }));
            return;
        }

        if (user?.role !== 'customer') {
            dispatch(showToast({ message: 'Only customers can add to wishlist', type: 'warning' }));
            return;
        }

        try {
            await dispatch(addToWishlist(bookId)).unwrap();
            dispatch(showToast({ message: 'Added to wishlist! 💖', type: 'success' }));
        } catch (error) {
            dispatch(showToast({ message: 'Failed to add to wishlist', type: 'error' }));
        }
    };

    const handleFilter = (key, value) => {
        dispatch(setFilters({ [key]: value }));
    };

    const clearFilter = (key) => {
        dispatch(setFilters({ [key]: '' }));
    };

    // Filter books based on search query
    const filteredBooks = books.filter((book) =>
        searchQuery
            ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
            : true
    );

    const sidebarSections = [
        {
            title: 'Shop by category',
            items: [
                { name: 'Books', filter: 'Books' },
                { name: 'Audiobooks', filter: 'Audiobooks' },
                { name: 'Magazines', filter: 'Magazines' },
                { name: 'Sci-Fi & Fantasy', filter: 'Science Fiction' },
                { name: 'Mystery & Thriller', filter: 'Mystery' },
                { name: 'Romance', filter: 'Romance' },
                { name: 'Comics & Graphic Novels', filter: 'Comics' },
                { name: 'Textbooks', filter: 'Textbooks' }
            ]
        },
        {
            title: 'Shop Favorites',
            items: [
                { name: 'Bestsellers', filter: 'Bestsellers' },
                { name: 'New Arrivals', filter: 'New' },
                { name: 'Box Sets', filter: 'Box Sets' },
                { name: 'Award Winners', filter: 'Award' }
            ]
        },
        {
            title: 'Shop Featured Authors',
            items: [
                { name: 'Stephen King', filter: 'King' },
                { name: 'J.K. Rowling', filter: 'Rowling' },
                { name: 'George R.R. Martin', filter: 'Martin' },
                { name: 'Agatha Christie', filter: 'Christie' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">

                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Books & Magazines</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 hidden lg:block">
                        {sidebarSections.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                                <ul className="space-y-1.5 text-sm">
                                    {section.items.map((item) => (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => handleFilter('category', item.filter)} // Simplified filtering logic
                                                className={`text-gray-600 hover:text-kindle-600 hover:underline text-left w-full transition-colors ${filters.category === item.filter ? 'font-bold text-kindle-600' : ''}`}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* Hero Banner */}
                        <div className="relative bg-teal-500 rounded-xl overflow-hidden mb-10 h-64 sm:h-80 flex shadow-sm">
                            <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center text-white z-10">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">
                                    Classics for Every<br />Bookworm
                                </h2>
                                <p className="text-teal-100 mb-6 font-medium">Don't close the book! Get bidding.</p>
                                <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all w-fit">
                                    Bid Now →
                                </button>
                            </div>
                            {/* Decorative Background / Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                                    alt="Classic Books"
                                    className="w-full h-full object-cover object-right opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-500/80 to-transparent"></div>
                            </div>
                        </div>

                        {/* Search & Mobile Filter Toggle */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search within Books & Magazines..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white w-full sm:w-auto justify-center"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                Filters
                            </button>
                        </div>

                        {/* Mobile Sidebar (Collapsible) */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="lg:hidden mb-6 overflow-hidden"
                                >
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                                        {sidebarSections.map((section, idx) => (
                                            <div key={idx}>
                                                <h3 className="font-bold text-gray-900 mb-2">{section.title}</h3>
                                                <ul className="space-y-1 text-sm">
                                                    {section.items.map((item) => (
                                                        <li key={item.name}>
                                                            <button
                                                                onClick={() => {
                                                                    handleFilter('category', item.filter);
                                                                    setShowFilters(false);
                                                                }}
                                                                className={`text-gray-600 hover:text-kindle-600 ${filters.category === item.filter ? 'font-bold' : ''}`}
                                                            >
                                                                {item.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Section Title */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Featured Collection</h2>
                            <select
                                value={filters.sortBy || 'featured'}
                                onChange={(e) => handleFilter('sortBy', e.target.value)}
                                className="text-sm border-none bg-transparent hover:text-kindle-600 focus:ring-0 cursor-pointer text-gray-600 font-medium"
                            >
                                <option value="featured">Sort by: Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {/* Books Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
                                <SkeletonLoader type="card" count={10} />
                            </div>
                        ) : filteredBooks.length > 0 ? (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } },
                                }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6"
                            >
                                {filteredBooks.map((book) => (
                                    <motion.div
                                        key={book._id || book.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                    >
                                        <BookCard book={book} onWishlist={handleWishlist} viewMode="grid" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <EmptyState
                                icon={<span className="text-4xl">📚</span>}
                                title="No books found"
                                description="Try changing the category or search terms."
                            />
                        )}

                        {/* "Shop by Category" Grid (Bottom) */}
                        <div className="mt-16 border-t border-gray-200 pt-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {sidebarSections[0].items.slice(0, 5).map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleFilter('category', item.filter)}
                                        className="group text-left"
                                    >
                                        <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                                            <img
                                                src={`https://source.unsplash.com/random/300x400/?${item.name.toLowerCase().split(' ')[0]},book`}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-kindle-600">{item.name}</h3>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default BooksPage;
