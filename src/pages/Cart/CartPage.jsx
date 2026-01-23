import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { removeFromCart, updateQuantity, clearCart } from '../../app/features/slice/cartSlice';
import { showToast } from '../../app/features/slice/uiSlice';
import Button from '../../components/ui/Button';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleQuantityChange = (bookId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateQuantity({ bookId, quantity: newQuantity }));
    };

    const handleRemove = (bookId, title) => {
        dispatch(removeFromCart(bookId));
        dispatch(showToast({ message: `"${title}" removed from cart`, type: 'info' }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        dispatch(showToast({ message: 'Cart cleared', type: 'info' }));
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            dispatch(showToast({ message: 'Please login to checkout', type: 'warning' }));
            return;
        }
        navigate('/checkout');
    };

    const shipping = total > 25 ? 0 : 4.99;
    const tax = total * 0.08; // 8% tax
    const grandTotal = total + shipping + tax;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
                            <svg className="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added any books yet.</p>
                        <Link to="/books">
                            <Button variant="primary" size="lg">
                                Continue Shopping
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </h1>
                    {items.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.bookId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-4">
                                    {/* Book Image */}
                                    <Link to={`/books/${item.book.id}`} className="flex-shrink-0">
                                        <img
                                            src={item.book.image}
                                            alt={item.book.title}
                                            className="w-24 h-32 object-cover rounded border border-gray-200"
                                        />
                                    </Link>

                                    {/* Book Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/books/${item.book.id}`}>
                                            <h3 className="font-semibold text-gray-900 hover:text-kindle-600 line-clamp-2 mb-1">
                                                {item.book.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 mb-2">by {item.book.author}</p>

                                        {item.book.condition && (
                                            <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mb-2">
                                                {item.book.condition}
                                            </span>
                                        )}

                                        <div className="flex items-center gap-4 mt-3">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => handleQuantityChange(item.bookId, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.bookId, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemove(item.bookId, item.book.title)}
                                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-900">
                                            ₹{(item.book.price * item.quantity).toFixed(2)}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ₹{item.book.price} each
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                                        {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-gray-500">
                                        Add ₹{(25 - total).toFixed(2)} more for FREE shipping
                                    </p>
                                )}
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax (8%)</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full mb-3"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>

                            <Link to="/books">
                                <Button variant="secondary" className="w-full">
                                    Continue Shopping
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>30-day returns</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Quality guaranteed</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
