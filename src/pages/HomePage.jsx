import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../app/features/slice/booksSlice';
import Button from '../components/ui/Button';
import BookCard from '../components/books/BookCard';

const HomePage = () => {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks({}));
    }, [dispatch]);

    // Mock data for Featured Authors
    const featuredAuthors = [
        { name: 'Arthur Gonzalez', image: 'https://i.pravatar.cc/150?img=12' },
        { name: 'Dana Chambers', image: 'https://i.pravatar.cc/150?img=5' },
        { name: 'Enrique Wallace', image: 'https://i.pravatar.cc/150?img=33' },
        { name: 'Ernesto Wade', image: 'https://i.pravatar.cc/150?img=14' },
        { name: 'Georgia Ramirez', image: 'https://i.pravatar.cc/150?img=47' },
        { name: 'Gilberto Mills', image: 'https://i.pravatar.cc/150?img=52' },
        { name: 'Jessica Munoz', image: 'https://i.pravatar.cc/150?img=29' },
        { name: 'Karla Newman', image: 'https://i.pravatar.cc/150?img=44' },
    ];

    // Mock data for Testimonials
    const testimonials = [
        {
            text: "I am so happy to find a site where I can shop for unusual items. The packaging was phenomenal and my book arrived on time in perfect condition.",
            author: "JOEL M.",
            location: "NEW YORK"
        },
        {
            text: "Excellent service. The books were wrapped securely and arrived in pristine condition. I sent an email after to books arrived to ask about the author.",
            author: "ELLIE A.",
            location: "NEW YORK"
        },
        {
            text: "I am so happy to find a site where I can shop for unusual items. The packaging was phenomenal and my book arrived on time in perfect condition.",
            author: "JOHN DOE",
            location: "NEW YORK"
        }
    ];

    // Mock data for Publishers with styled logos
    const publishers = [
        { name: 'Books & Travel', logo: '📚✈️', color: 'text-blue-600' },
        { name: 'Penguin Books', logo: '🐧', color: 'text-gray-800' },
        { name: 'Books for Life', logo: '📖❤️', color: 'text-red-600' },
        { name: 'Book Press', logo: '📰', color: 'text-green-600' },
        { name: 'The Books Hub', logo: '📚🌟', color: 'text-purple-600' },
        { name: 'Mountain Books', logo: '⛰️📚', color: 'text-amber-700' },
    ];

    // Realistic book images
    const bookImages = [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop',
    ];

    const bookTitles = [
        'The Sailing Grace',
        'World Literature',
        'The Truth of Tomorrow',
        'Heartland Girls',
        'Life Flight',
        'Goodbye Again',
        'The Shining',
        'Carrie',
        'Christine',
        'Misery',
        'The Green Mile',
        'It',
        'Pet Sematary',
        'The Gunslinger',
        'Homeland',
    ];

    const authors = [
        'Arthur Golden',
        'J.K. Rowling',
        'Stephen King',
        'Agatha Christie',
        'Dan Brown',
        'Margaret Atwood',
        'George Orwell',
        'Harper Lee',
    ];

    // Mock book data generator with realistic data
    const generateBooks = (count, prefix, startIndex = 0) => {
        return Array.from({ length: count }).map((_, i) => {
            const imgIndex = (startIndex + i) % bookImages.length;
            const titleIndex = (startIndex + i) % bookTitles.length;
            const authorIndex = (startIndex + i) % authors.length;

            return {
                _id: `${prefix}-${i}`,
                title: bookTitles[titleIndex],
                author: authors[authorIndex],
                price: (15 + i * 3 + Math.random() * 10).toFixed(2),
                oldPrice: (30 + i * 5 + Math.random() * 15).toFixed(2),
                image: bookImages[imgIndex],
                rating: (4 + Math.random()).toFixed(1),
                reviews: Math.floor(80 + Math.random() * 200)
            };
        });
    };

    const popularBooks = generateBooks(6, 'Popular', 0);
    const dailyDeals = generateBooks(2, 'Deal', 6);
    const trendingBooks = generateBooks(3, 'Trending', 8);
    const top10ThisWeek = generateBooks(5, 'Top10', 11);
    const mostViewed = generateBooks(3, 'Viewed', 1);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const slideIn = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Top 10 Books */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="bg-gradient-to-r from-pink-50 via-blue-50 to-purple-50 py-16 relative overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left side - Text */}
                        <motion.div variants={slideIn} className="space-y-6">
                            <div>
                                <p className="text-kindle-600 font-semibold mb-2 uppercase tracking-wide">INTRODUCE</p>
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Top 10 Books<br />
                                    To Make It A<br />
                                    Great Year
                                </h1>
                            </div>
                            <Link to="/books">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-kindle-600 text-white font-semibold rounded-lg hover:bg-kindle-700 transition-colors shadow-lg"
                                >
                                    Shop Now
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Right side - Book display */}
                        <motion.div
                            variants={itemVariants}
                            className="relative h-96 hidden lg:flex items-center justify-center"
                        >
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-full opacity-20 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>

                            {/* Book mockups */}
                            <div className="relative z-10 flex gap-4">
                                <motion.div
                                    initial={{ rotate: -15, x: -30 }}
                                    animate={{ rotate: -8, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="w-48 h-72 bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
                                        alt="Book"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-48 h-72 bg-white rounded-lg shadow-2xl overflow-hidden"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
                                        alt="Book"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>

                            {/* Decorative leaf */}
                            <motion.div
                                animate={{ rotate: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 right-8 text-6xl"
                            >
                                🍂
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" className="w-full h-16 text-white">
                        <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="currentColor" />
                    </svg>
                </div>
            </motion.section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 py-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Popular Books Section */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="mb-16"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Popular Books</h2>
                                <Link to="/books">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        View All →
                                    </motion.button>
                                </Link>
                            </div>
                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                            >
                                {popularBooks.map((book) => (
                                    <motion.div key={book._id} variants={itemVariants}>
                                        <BookCard book={book} viewMode="grid" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>

                        {/* Daily Deals Section */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="mb-16"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Daily Deals</h2>
                            </div>
                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                            >
                                {dailyDeals.map((book) => (
                                    <motion.div key={book._id} variants={itemVariants}>
                                        <BookCard book={book} viewMode="grid" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>

                        {/* Trending Now Section */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="mb-16"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                                <Link to="/books">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        View All →
                                    </motion.button>
                                </Link>
                            </div>
                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
                            >
                                {trendingBooks.map((book) => (
                                    <motion.div key={book._id} variants={itemVariants}>
                                        <BookCard book={book} viewMode="grid" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full lg:w-80 space-y-8"
                    >
                        {/* Top 10 This Week */}
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center border-b border-gray-200 pb-3">
                                Top 10 This Week
                            </h3>
                            <div className="space-y-4">
                                {top10ThisWeek.map((book, index) => (
                                    <motion.div
                                        key={book._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                        className="flex gap-3 cursor-pointer"
                                    >
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-16 h-20 object-cover rounded shadow-sm"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">{book.title}</h4>
                                            <p className="text-xs text-gray-500">{book.author}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-yellow-500 text-xs">★★★★★</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Most Viewed */}
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center border-b border-gray-200 pb-3">
                                Most Viewed
                            </h3>
                            <div className="space-y-4">
                                {mostViewed.map((book, index) => (
                                    <motion.div
                                        key={book._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.5 }}
                                        whileHover={{ x: 5 }}
                                        className="flex gap-3 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 bg-kindle-600 text-white font-bold rounded-full text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">{book.title}</h4>
                                            <p className="text-xs text-gray-500">{book.author}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* Featured Authors Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="py-16 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Authors</h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                        >
                            View All →
                        </motion.button>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6"
                    >
                        {featuredAuthors.map((author, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="text-center cursor-pointer"
                            >
                                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={author.image}
                                        alt={author.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-sm font-semibold text-gray-900">{author.name}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* What Client Says - Testimonials */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">What Client Says</h2>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className={`p-8 rounded-2xl shadow-sm ${index === 0 ? 'bg-green-50' : index === 1 ? 'bg-blue-50' : 'bg-purple-50'
                                    }`}
                            >
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                                        <img
                                            src={`https://i.pravatar.cc/150?img=${index + 20}`}
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 mb-6 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="text-center">
                                    <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Publishers */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="py-16 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Publishers</h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors"
                        >
                            View All →
                        </motion.button>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6"
                    >
                        {publishers.map((publisher, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center h-28 cursor-pointer border border-gray-100 hover:border-kindle-300 transition-all"
                            >
                                <div className={`text-4xl mb-2 ${publisher.color}`}>
                                    {publisher.logo}
                                </div>
                                <p className="text-xs font-semibold text-gray-700 text-center">{publisher.name}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Newsletter / CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-20 bg-gradient-to-r from-kindle-600 to-kindle-700 text-white"
            >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        Get Your First Book for ₹99
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-kindle-100 mb-8"
                    >
                        Sign up for our newsletter and get exclusive access to our "New Member" collection.
                    </motion.p>
                    <motion.form
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md mx-auto flex gap-2"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-white text-kindle-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Subscribe
                        </motion.button>
                    </motion.form>
                </div>
            </motion.section>
        </div>
    );
};

export default HomePage;
