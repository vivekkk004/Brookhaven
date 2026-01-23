const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mockOrders = [
    {
        id: 'ord-001',
        bookId: '1',
        bookTitle: 'Pride and Prejudice',
        bookImage: 'https://covers.openlibrary.org/b/id/8231986-L.jpg',
        quantity: 1,
        price: 45.99,
        status: 'pending',
        customerName: 'John Doe',
        customerId: 'cust-001',
        orderDate: '2026-01-18T10:30:00Z',
    },
    {
        id: 'ord-002',
        bookId: '2',
        bookTitle: 'The Great Gatsby',
        bookImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        quantity: 1,
        price: 38.50,
        status: 'accepted',
        customerName: 'Jane Smith',
        customerId: 'cust-002',
        orderDate: '2026-01-17T14:20:00Z',
    },
];

export const getCustomerOrders = async () => {
    await delay();
    return mockOrders;
};

export const getCustomerProfile = async () => {
    await delay();

    return {
        id: 'cust-001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        joinedDate: '2025-06-15',
    };
};

export const updateCustomerProfile = async (profileData) => {
    await delay();

    return {
        ...profileData,
        id: 'cust-001',
    };
};

export const placeOrder = async (orderData) => {
    await delay();

    const newOrder = {
        id: 'ord-' + Math.random().toString(36).substr(2, 9),
        ...orderData,
        status: 'pending',
        orderDate: new Date().toISOString(),
    };

    return newOrder;
};
