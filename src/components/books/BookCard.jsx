import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../ui/Card';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book, onWishlist, viewMode = 'grid' }) => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        onWishlist(book.id);
    };

    if (viewMode === 'list') {
        return (
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/books/${book.id}`)}
            >
                <div className="flex gap-3 p-3">
                    {/* Book Cover - List View */}
                    <div className="relative w-20 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden group">
                        <img
                            src={book.image}
                            alt={book.title}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                }`}
                        />
                    </div>

                    {/* Book Info - List View */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between mb-1">
                            <div className="flex-1 pr-3">
                                <h3 className="font-semibold text-sm text-gray-900 mb-0.5 line-clamp-2 leading-tight">
                                    {book.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-1">by {book.author}</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleWishlistClick}
                                className="flex-shrink-0 text-gray-300 hover:text-red-500"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill={isLiked ? 'currentColor' : 'none'}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Rating */}
                        {book.rating && (
                            <div className="flex items-center gap-1 mb-2">
                                <span className="text-xs font-semibold text-gray-700">{book.rating}</span>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <span className="text-xs text-gray-400">({book.reviews || 0})</span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-auto">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-base font-bold text-gray-900">₹{book.price}</span>
                                {book.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through">₹{book.originalPrice}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Grid View (Minimal / Kindle Style)
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group cursor-pointer flex flex-col gap-2"
            onClick={() => navigate(`/books/${book.id}`)}
        >
            {/* Book Cover */}
            <div className="relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                    src={book.image}
                    alt={book.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Discount Badge (subtle) */}
                {book.originalPrice && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                        -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                    </div>
                )}

                {/* Wishlist Button (visible on hover) */}
                {onWishlist && (
                    <button
                        onClick={handleWishlistClick}
                        className="absolute bottom-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 hover:scale-100 shadow-sm"
                    >
                        <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Book Info (Minimal) */}
            <div className="space-y-0.5">
                <h3 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2" title={book.title}>
                    {book.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>
                <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-sm font-bold text-gray-900">₹{book.price}</span>
                    {book.rating && (
                        <div className="flex items-center gap-0.5 ml-auto">
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs text-gray-600">{book.rating}</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BookCard;
