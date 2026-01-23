import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const SellerChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const chats = [
        { id: 1, user: 'Alice Johnson', lastMessage: 'Is this book still available?', time: '10:00 AM', unread: 2 },
        { id: 2, user: 'Bob Smith', lastMessage: 'Thanks for the quick shipping!', time: 'Yesterday', unread: 0 },
        { id: 3, user: 'Charlie Brown', lastMessage: 'Can you upload more photos?', time: 'Jan 15', unread: 0 },
    ];

    const messages = [
        { id: 1, sender: 'customer', text: 'Hi, I am interested in "The Great Gatsby".', time: '09:58 AM' },
        { id: 2, sender: 'customer', text: 'Is this book still available?', time: '10:00 AM' },
    ];

    const handleSend = (e) => {
        e.preventDefault();
        // Logic to send message
        setNewMessage('');
        // Mock UI update would go here
    };

    return (
        <div className="h-[calc(100vh-140px)] flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="font-bold text-gray-900">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === chat.id ? 'bg-blue-50/50' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-semibold text-sm ${selectedChat === chat.id ? 'text-kindle-700' : 'text-gray-900'}`}>{chat.user}</h3>
                                <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                                <span className="inline-block px-1.5 py-0.5 bg-kindle-500 text-white text-[10px] font-bold rounded-full mt-2">
                                    {chat.unread}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <header className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Alice Johnson</h3>
                    <span className="text-xs text-gray-400">Order #ORD-8855</span>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${msg.sender === 'user'
                                        ? 'bg-kindle-500 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-kindle-100' : 'text-gray-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSend} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kindle-500 focus:border-kindle-500 bg-gray-50 focus:bg-white transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="p-2 bg-kindle-500 text-white rounded-lg hover:bg-kindle-600 disabled:opacity-50 transition-colors"
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerChatPage;
