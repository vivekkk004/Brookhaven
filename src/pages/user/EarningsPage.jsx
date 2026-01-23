import { ArrowUpIcon, ArrowDownIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const EarningsPage = () => {
    // Mock Data
    const transactions = [
        { id: 'TXN-001', date: '2024-01-20', type: 'Payout', amount: 450.00, status: 'Completed' },
        { id: 'TXN-002', date: '2024-01-18', type: 'Sale', amount: 45.99, status: 'Pending' },
        { id: 'TXN-003', date: '2024-01-15', type: 'Sale', amount: 12.50, status: 'Completed' },
        { id: 'TXN-004', date: '2024-01-10', type: 'Payout', amount: 120.00, status: 'Completed' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Earnings & Payouts</h1>
                <p className="text-gray-500">Track your revenue and withdrawal history</p>
            </header>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-kindle-600 to-kindle-800 rounded-2xl p-6 text-white shadow-lg"
                >
                    <div className="flex items-center justify-between mb-4">
                        <p className="opacity-80 font-medium">Available Balance</p>
                        <BanknotesIcon className="w-6 h-6 opacity-60" />
                    </div>
                    <h2 className="text-3xl font-bold mb-1">₹1,245.50</h2>
                    <p className="text-sm opacity-70">Ready for payout</p>
                    <button className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm">
                        Withdraw Funds
                    </button>
                </motion.div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Total Earnings</p>
                        <h2 className="text-2xl font-bold text-gray-900">₹5,890.00</h2>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full">
                        <ArrowUpIcon className="w-4 h-4" />
                        <span>+12.5% this month</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Pending Clearance</p>
                        <h2 className="text-2xl font-bold text-gray-900">₹345.00</h2>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        Funds from recent sales will be available in 3-5 days.
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    <button className="text-sm text-kindle-600 hover:text-kindle-700 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Date</th>
                                <th className="px-6 py-3 font-semibold">Transaction ID</th>
                                <th className="px-6 py-3 font-semibold">Type</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((txn, index) => (
                                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(txn.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{txn.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{txn.type}</td>
                                    <td className={`px-6 py-4 text-sm font-bold ${txn.type === 'Payout' ? 'text-red-600' : 'text-green-600'}`}>
                                        {txn.type === 'Payout' ? '-' : '+'}₹{txn.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${txn.status === 'Completed'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EarningsPage;
