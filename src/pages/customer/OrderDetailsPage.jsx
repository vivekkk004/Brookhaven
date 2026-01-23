import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, PrinterIcon, TruckIcon } from '@heroicons/react/24/outline';
import Button from '../../components/ui/Button';

const OrderDetailsPage = () => {
    const { id } = useParams();

    // Mock Data based on ID (real implementation would fetch)
    const order = {
        id: id || 'ORD-12345-6789',
        date: '2024-01-20',
        total: 45.99,
        status: 'Shipped',
        trackingNumber: 'TRK-8899776655',
        shippingAddress: {
            name: 'Vivek Kumar',
            street: '123 Peace Blvd',
            city: 'Booktown',
            state: 'BK',
            zip: '12345'
        },
        paymentMethod: 'Visa ending in 4242',
        items: [
            { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15.99, quantity: 1, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800' },
            { id: 2, title: '1984', author: 'George Orwell', price: 12.99, quantity: 1, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800' },
            { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 17.01, quantity: 1, image: 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&q=80&w=800' }
        ]
    };

    const steps = ['Ordered', 'Processing', 'Shipped', 'Delivered'];
    const currentStep = steps.indexOf(order.status);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/customer/orders" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                        <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <PrinterIcon className="w-4 h-4" /> Invoice
                    </Button>
                    <Button variant="primary">Track Order</Button>
                </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-kindle-500 -translate-y-1/2 rounded-full transition-all duration-1000"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />

                    <div className="relative flex justify-between">
                        {steps.map((step, idx) => (
                            <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors
                                    ${idx <= currentStep
                                        ? 'bg-kindle-500 border-kindle-500 text-white'
                                        : 'bg-white border-gray-300 text-gray-400'}
                                `}>
                                    {idx <= currentStep ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-xs font-bold">{idx + 1}</span>
                                    )}
                                </div>
                                <span className={`text-xs font-medium ${idx <= currentStep ? 'text-kindle-700' : 'text-gray-500'}`}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="font-bold text-gray-900">Items Ordered</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                            <div key={item.id} className="p-6 flex gap-4">
                                <img src={item.image} alt={item.title} className="w-20 h-28 object-cover rounded border border-gray-100" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mb-1">by {item.author}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{(order.total - 8.00).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>₹5.00</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Tax</span>
                            <span>₹3.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping & Payment Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Shipping Details</h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            {order.trackingNumber && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 uppercase">Tracking Number</p>
                                    <p className="font-mono text-kindle-600 flex items-center gap-2">
                                        <TruckIcon className="w-4 h-4" />
                                        {order.trackingNumber}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Payment Information</h2>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-500">
                                VISA
                            </div>
                            <span>{order.paymentMethod}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
