import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { removeFromWishlist } from '../../app/features/slice/wishlistSlice';
import { addToCart } from '../../app/features/slice/cartSlice';
import { showToast } from '../../app/features/slice/uiSlice';
import Button from '../../components/ui/Button';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
        dispatch(showToast({ message: 'Removed from wishlist', type: 'info' }));
    };

    const handleAddToCart = (book) => {
        dispatch(addToCart({ book, quantity: 1 }));
        dispatch(showToast({ message: 'Added to cart', type: 'success' }));
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-500">Saved books for later ({wishlistItems.length} items)</p>
            </header>

            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {wishlistItems.map((book) => (
                            <motion.div
                                key={book.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-all"
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-full shadow-sm cursor-pointer hover:bg-red-50 text-red-500 transition-colors"
                                        onClick={() => handleRemove(book.id)}>
                                        <TrashIcon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-900 line-clamp-1 mb-1" title={book.title}>
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>

                                    <div className="mt-auto flex items-center justify-between pt-2">
                                        <span className="font-bold text-lg text-kindle-600">${book.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(book)}
                                            className="p-2 bg-kindle-100 text-kindle-700 rounded-lg hover:bg-kindle-200 transition-colors"
                                            title="Add to Cart"
                                        >
                                            <ShoppingCartIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HeartIcon className="w-10 h-10 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Save items you want to buy later by clicking the heart icon on any book card.
                    </p>
                    <Link to="/books">
                        <Button variant="primary">Explore Books</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
