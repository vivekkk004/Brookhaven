import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToWishlist } from '../app/features/slice/wishlistSlice';
import { addToCart } from '../app/features/slice/cartSlice';
import { showToast } from '../app/features/slice/uiSlice';
import Button from '../components/ui/Button';

const BookDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { books } = useSelector((state) => state.books);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const [quantity, setQuantity] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Find the book by ID
    const book = books.find(b => b.id === id);

    useEffect(() => {
        if (!book) {
            navigate('/books');
        }
    }, [book, navigate]);

    if (!book) {
        return null;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ book, quantity }));
        dispatch(showToast({ message: `Added ${quantity} item(s) to cart! 🛒`, type: 'success' }));
    };

    const handleWishlist = async () => {
        if (!isAuthenticated) {
            dispatch(showToast({ message: 'Please login to add to wishlist', type: 'warning' }));
            return;
        }

        if (user?.role !== 'customer') {
            dispatch(showToast({ message: 'Only customers can add to wishlist', type: 'warning' }));
            return;
        }

        try {
            await dispatch(addToWishlist(book.id)).unwrap();
            setIsInWishlist(true);
            dispatch(showToast({ message: 'Added to wishlist! 💖', type: 'success' }));
        } catch (error) {
            dispatch(showToast({ message: 'Failed to add to wishlist', type: 'error' }));
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Breadcrumb - Amazon Style */}
                <nav className="flex items-center gap-2 text-xs mb-4 text-gray-600">
                    <Link to="/" className="hover:text-kindle-600 hover:underline">Home</Link>
                    <span>›</span>
                    <Link to="/books" className="hover:text-kindle-600 hover:underline">Books</Link>
                    <span>›</span>
                    <Link to="/books" className="hover:text-kindle-600 hover:underline">{book.category || 'Fiction'}</Link>
                    <span>›</span>
                    <span className="text-gray-900 line-clamp-1">{book.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left - Image Section (Amazon: 40% width) */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-20">
                            {/* Main Image */}
                            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-4">
                                <div className="relative">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-auto max-h-[500px] object-contain"
                                    />
                                    {book.originalPrice && (
                                        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1">
                                            -{Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Share & Wishlist - Amazon Style */}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleWishlist}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Add to List
                                    </span>
                                </button>
                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Middle - Product Info (Amazon: 40% width) */}
                    <div className="lg:col-span-4">
                        {/* Title */}
                        <h1 className="text-2xl font-normal text-gray-900 mb-1">
                            {book.title}
                        </h1>

                        {/* Author */}
                        <div className="text-sm mb-2">
                            <span className="text-gray-600">by </span>
                            <Link to="#" className="text-kindle-600 hover:text-kindle-700 hover:underline">
                                {book.author}
                            </Link>
                        </div>

                        {/* Rating - Amazon Style */}
                        {book.rating && (
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-kindle-500' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <Link to="#" className="text-sm text-kindle-600 hover:text-kindle-700 hover:underline">
                                    {book.reviews || 0} ratings
                                </Link>
                            </div>
                        )}

                        <div className="border-t border-gray-300 my-3"></div>

                        {/* Price - Amazon Style */}
                        <div className="mb-4">
                            {book.originalPrice && (
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-gray-600">List Price:</span>
                                    <span className="text-sm text-gray-600 line-through">₹{book.originalPrice}</span>
                                </div>
                            )}
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm text-gray-700">Price:</span>
                                <span className="text-3xl text-red-700">₹{book.price}</span>
                            </div>
                            {book.originalPrice && (
                                <div className="text-sm text-gray-700 mt-1">
                                    You Save: <span className="text-red-700 font-semibold">₹{(book.originalPrice - book.price).toFixed(2)} ({Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%)</span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-300 my-3"></div>

                        {/* Product Details - Amazon Style */}
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex">
                                <span className="w-32 text-gray-700 font-semibold">Condition:</span>
                                <span className="text-gray-900">{book.condition}</span>
                            </div>
                            {book.year && (
                                <div className="flex">
                                    <span className="w-32 text-gray-700 font-semibold">Publication:</span>
                                    <span className="text-gray-900">{book.year}</span>
                                </div>
                            )}
                            <div className="flex">
                                <span className="w-32 text-gray-700 font-semibold">Language:</span>
                                <span className="text-gray-900">English</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 my-3"></div>

                        {/* Description */}
                        <div className="mb-4">
                            <h2 className="font-bold text-lg mb-2">About this item</h2>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                <li>{book.description || `Classic edition of "${book.title}" by ${book.author}`}</li>
                                <li>Condition: {book.condition}</li>
                                <li>Perfect for collectors and readers alike</li>
                                <li>Ships from verified seller</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right - Buy Box (Amazon: 20% width) */}
                    <div className="lg:col-span-3">
                        <div className="border border-gray-300 rounded-lg p-4 lg:sticky lg:top-20">
                            {/* Price in Buy Box */}
                            <div className="mb-3">
                                <div className="text-3xl text-red-700 mb-1">₹{book.price}</div>
                                {book.originalPrice && (
                                    <div className="text-xs text-gray-600">
                                        <span className="line-through">₹{book.originalPrice}</span>
                                        <span className="ml-2 text-red-700">Save {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%</span>
                                    </div>
                                )}
                            </div>

                            {/* Delivery Info */}
                            <div className="mb-3 text-sm">
                                <div className="flex items-start gap-2 mb-2">
                                    <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                    </svg>
                                    <div>
                                        <div className="font-semibold text-teal-700">FREE delivery</div>
                                        <div className="text-gray-700">on orders over ₹25</div>
                                    </div>
                                </div>
                                <div className="text-green-700 font-semibold mb-1">In Stock</div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-3">
                                <label className="block text-sm font-semibold mb-1">Quantity:</label>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-20 px-2 py-1 border border-gray-400 rounded bg-gray-50 text-sm focus:border-kindle-500 focus:ring-1 focus:ring-kindle-500"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Add to Cart - Amazon Yellow */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 border border-yellow-600 rounded-lg shadow-sm text-sm font-medium transition-all mb-2"
                            >
                                Add to Cart
                            </button>

                            {/* Buy Now - Amazon Orange */}
                            <button
                                onClick={handleBuyNow}
                                className="w-full py-2 px-4 bg-kindle-500 hover:bg-kindle-600 text-white rounded-lg shadow-sm text-sm font-medium transition-all mb-3"
                            >
                                Buy Now
                            </button>

                            {/* Secure Transaction */}
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Secure transaction</span>
                            </div>

                            <div className="border-t border-gray-300 pt-3 space-y-2 text-xs text-gray-700">
                                <div className="flex justify-between">
                                    <span>Ships from</span>
                                    <span className="font-semibold">BookStore</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sold by</span>
                                    <span className="font-semibold">BookStore</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Returns</span>
                                    <Link to="#" className="text-kindle-600 hover:text-kindle-700 hover:underline">
                                        30-day refund
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Box */}
                        <div className="border border-gray-300 rounded-lg p-4 mt-4">
                            <div className="text-sm space-y-2">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-700">Quality verified</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-700">Fast shipping</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-700">Easy returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information Section - Below */}
                <div className="mt-8 border-t border-gray-300 pt-6">
                    <h2 className="text-2xl font-bold mb-4">Product details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 text-sm">
                            <div className="flex">
                                <span className="w-40 text-gray-700 font-semibold">Author:</span>
                                <span className="text-gray-900">{book.author}</span>
                            </div>
                            <div className="flex">
                                <span className="w-40 text-gray-700 font-semibold">Condition:</span>
                                <span className="text-gray-900">{book.condition}</span>
                            </div>
                            {book.year && (
                                <div className="flex">
                                    <span className="w-40 text-gray-700 font-semibold">Publication Year:</span>
                                    <span className="text-gray-900">{book.year}</span>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex">
                                <span className="w-40 text-gray-700 font-semibold">Category:</span>
                                <span className="text-gray-900">{book.category || 'Fiction'}</span>
                            </div>
                            <div className="flex">
                                <span className="w-40 text-gray-700 font-semibold">Language:</span>
                                <span className="text-gray-900">English</span>
                            </div>
                            <div className="flex">
                                <span className="w-40 text-gray-700 font-semibold">Best Sellers Rank:</span>
                                <span className="text-gray-900">#1,234 in Books</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="mt-8 border-t border-gray-300 pt-6">
                    <h2 className="text-2xl font-bold mb-4">Customer reviews</h2>
                    {book.rating && (
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-kindle-500' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-lg font-semibold">{book.rating} out of 5</span>
                            <span className="text-sm text-gray-600">{book.reviews || 0} global ratings</span>
                        </div>
                    )}

                    {/* Write a Review Button */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-3">Review this product</h3>
                        <p className="text-sm text-gray-600 mb-3">Share your thoughts with other customers</p>

                        {/* Review Form */}
                        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                if (!isAuthenticated) {
                                    dispatch(showToast({ message: 'Please login to write a review', type: 'warning' }));
                                    return;
                                }
                                const formData = new FormData(e.target);
                                const rating = formData.get('rating');
                                const title = formData.get('title');
                                const review = formData.get('review');

                                if (!rating || !title || !review) {
                                    dispatch(showToast({ message: 'Please fill all fields', type: 'warning' }));
                                    return;
                                }

                                // TODO: Dispatch review to backend
                                dispatch(showToast({ message: 'Review submitted successfully! ⭐', type: 'success' }));
                                e.target.reset();
                            }}>
                                {/* Star Rating Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-2">Overall rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <label key={star} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={star}
                                                    className="sr-only peer"
                                                    required
                                                />
                                                <div className="flex items-center gap-1 px-3 py-2 border-2 border-gray-300 rounded-lg peer-checked:border-kindle-500 peer-checked:bg-kindle-50 hover:border-kindle-400 transition-all">
                                                    <svg className="w-5 h-5 text-kindle-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-sm font-medium">{star}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Review Title */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-2">Add a headline</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="What's most important to know?"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-kindle-500 focus:ring-1 focus:ring-kindle-500"
                                        required
                                    />
                                </div>

                                {/* Review Text */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold mb-2">Add a written review</label>
                                    <textarea
                                        name="review"
                                        rows="4"
                                        placeholder="What did you like or dislike? What did you use this product for?"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-kindle-500 focus:ring-1 focus:ring-kindle-500"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 border border-yellow-600 rounded-lg shadow-sm text-sm font-medium transition-all"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sample Reviews Display */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold">Top reviews</h3>

                        {/* Sample Review 1 */}
                        <div className="border-b border-gray-300 pb-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                                    JD
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm mb-1">John Doe</div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 text-kindle-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold">Excellent book!</span>
                                    </div>
                                    <div className="text-xs text-gray-600 mb-2">
                                        Reviewed in the United States on January 15, 2024
                                        <span className="ml-2 text-kindle-600">Verified Purchase</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3">
                                        This is an amazing book! The condition was exactly as described, and it arrived quickly.
                                        Highly recommend for anyone interested in this topic. Great value for money!
                                    </p>
                                    <div className="flex items-center gap-4 text-xs">
                                        <button className="text-gray-600 hover:text-gray-900">
                                            Helpful
                                        </button>
                                        <span className="text-gray-500">12 people found this helpful</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sample Review 2 */}
                        <div className="border-b border-gray-300 pb-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                                    SM
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm mb-1">Sarah Miller</div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < 4 ? 'text-kindle-500' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold">Great addition to my collection</span>
                                    </div>
                                    <div className="text-xs text-gray-600 mb-2">
                                        Reviewed in the United States on January 10, 2024
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Good quality book. The pages are in excellent condition. Shipping was fast.
                                        Would definitely buy from this seller again.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs">
                                        <button className="text-gray-600 hover:text-gray-900">
                                            Helpful
                                        </button>
                                        <span className="text-gray-500">8 people found this helpful</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
