const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mockConversations = [
    {
        id: 'conv-001',
        otherUser: {
            id: 'user-002',
            name: 'Jane Smith',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
            role: 'customer',
        },
        lastMessage: 'Is the book still available?',
        lastMessageTime: '2026-01-20T16:30:00Z',
        unreadCount: 2,
    },
    {
        id: 'conv-002',
        otherUser: {
            id: 'user-003',
            name: 'Classic Books Store',
            avatar: 'https://ui-avatars.com/api/?name=Classic+Books&background=random',
            role: 'user',
        },
        lastMessage: 'Thank you for your purchase!',
        lastMessageTime: '2026-01-19T14:20:00Z',
        unreadCount: 0,
    },
];

const mockMessages = [
    {
        id: 'msg-001',
        conversationId: 'conv-001',
        senderId: 'user-002',
        senderName: 'Jane Smith',
        message: 'Hi, I\'m interested in Pride and Prejudice',
        timestamp: '2026-01-20T16:25:00Z',
    },
    {
        id: 'msg-002',
        conversationId: 'conv-001',
        senderId: 'current-user',
        senderName: 'You',
        message: 'Yes, it\'s available!',
        timestamp: '2026-01-20T16:28:00Z',
    },
    {
        id: 'msg-003',
        conversationId: 'conv-001',
        senderId: 'user-002',
        senderName: 'Jane Smith',
        message: 'Is the book still available?',
        timestamp: '2026-01-20T16:30:00Z',
    },
];

export const getConversations = async () => {
    await delay();
    return mockConversations;
};

export const getMessages = async (conversationId) => {
    await delay();

    return mockMessages.filter(m => m.conversationId === conversationId);
};

export const sendMessage = async (conversationId, message) => {
    await delay(500);

    const newMessage = {
        id: 'msg-' + Math.random().toString(36).substr(2, 9),
        conversationId,
        senderId: 'current-user',
        senderName: 'You',
        message,
        timestamp: new Date().toISOString(),
    };

    return newMessage;
};

export const createConversation = async (userId) => {
    await delay();

    const newConversation = {
        id: 'conv-' + Math.random().toString(36).substr(2, 9),
        otherUser: {
            id: userId,
            name: 'New User',
            avatar: 'https://ui-avatars.com/api/?name=New+User&background=random',
            role: 'customer',
        },
        lastMessage: '',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
    };

    return newConversation;
};
