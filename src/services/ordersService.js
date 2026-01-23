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
        shippingAddress: '123 Main St, New York, NY 10001',
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
        shippingAddress: '789 Oak Ave, Los Angeles, CA 90001',
    },
    {
        id: 'ord-003',
        bookId: '3',
        bookTitle: 'To Kill a Mockingbird',
        bookImage: 'https://covers.openlibrary.org/b/id/8231984-L.jpg',
        quantity: 1,
        price: 52.00,
        status: 'completed',
        customerName: 'Bob Johnson',
        customerId: 'cust-003',
        orderDate: '2026-01-15T09:15:00Z',
        shippingAddress: '456 Elm St, Chicago, IL 60601',
    },
];

export const getOrders = async () => {
    await delay();
    return mockOrders;
};

export const getOrderById = async (id) => {
    await delay();

    const order = mockOrders.find(o => o.id === id);
    if (!order) {
        throw new Error('Order not found');
    }

    return order;
};

export const acceptOrder = async (id) => {
    await delay();

    return {
        ...mockOrders.find(o => o.id === id),
        status: 'accepted',
    };
};

export const rejectOrder = async (id, reason) => {
    await delay();

    return {
        ...mockOrders.find(o => o.id === id),
        status: 'rejected',
        rejectionReason: reason,
    };
};

export const updateOrderStatus = async (id, status) => {
    await delay();

    return {
        ...mockOrders.find(o => o.id === id),
        status,
    };
};
