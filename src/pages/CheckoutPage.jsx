import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clearCart } from '../app/features/slice/cartSlice';
import { showToast } from '../app/features/slice/uiSlice';
import Button from '../components/ui/Button';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const shipping = total > 25 ? 0 : 4.99;
    const tax = total * 0.08;
    const grandTotal = total + shipping + tax;

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handlePlaceOrder = () => {
        // TODO: Send order to backend
        dispatch(clearCart());
        dispatch(showToast({ message: 'Order placed successfully! 🎉', type: 'success' }));
        navigate('/customer/orders');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <Link to="/books">
                            <Button variant="primary">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center">
                        {[
                            { num: 1, label: 'Shipping' },
                            { num: 2, label: 'Payment' },
                            { num: 3, label: 'Review' },
                        ].map((s, index) => (
                            <div key={s.num} className="flex items-center">
                                <div className={`flex items-center ${index > 0 ? 'ml-4' : ''}`}>
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s.num
                                            ? 'bg-kindle-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                            }`}
                                    >
                                        {s.num}
                                    </div>
                                    <span className={`ml-2 font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div className={`w-16 h-1 mx-4 ${step > s.num ? 'bg-kindle-500' : 'bg-gray-300'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Step 1: Shipping Information */}
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                                <form onSubmit={handleShippingSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingInfo.fullName}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={shippingInfo.email}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingInfo.city}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingInfo.state}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingInfo.zipCode}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" variant="primary" className="w-full">
                                        Continue to Payment
                                    </Button>
                                </form>
                            </motion.div>
                        )}

                        {/* Step 2: Payment Information */}
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="1234 5678 9012 3456"
                                            value={paymentInfo.cardNumber}
                                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cardholder Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={paymentInfo.cardName}
                                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="MM/YY"
                                                value={paymentInfo.expiryDate}
                                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="123"
                                                value={paymentInfo.cvv}
                                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1">
                                            Back
                                        </Button>
                                        <Button type="submit" variant="primary" className="flex-1">
                                            Review Order
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* Step 3: Review Order */}
                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Shipping Address */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">Shipping Address</h3>
                                        <button onClick={() => setStep(1)} className="text-sm text-kindle-600 hover:text-kindle-700">
                                            Edit
                                        </button>
                                    </div>
                                    <div className="text-gray-700 space-y-1">
                                        <p className="font-semibold">{shippingInfo.fullName}</p>
                                        <p>{shippingInfo.address}</p>
                                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                                        <p>{shippingInfo.phone}</p>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                                        <button onClick={() => setStep(2)} className="text-sm text-kindle-600 hover:text-kindle-700">
                                            Edit
                                        </button>
                                    </div>
                                    <div className="text-gray-700">
                                        <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.bookId} className="flex gap-4">
                                                <img
                                                    src={item.book.image}
                                                    alt={item.book.title}
                                                    className="w-16 h-20 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{item.book.title}</h4>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">₹{(item.book.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">
                                        Back
                                    </Button>
                                    <Button variant="primary" onClick={handlePlaceOrder} className="flex-1">
                                        Place Order
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
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
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{grandTotal.toFixed(2)}</span>
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

export default CheckoutPage;
