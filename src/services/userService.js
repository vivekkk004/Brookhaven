const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mockListings = [
    {
        id: '1',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        price: 45.99,
        condition: 'Good',
        category: 'Classic Literature',
        stock: 3,
        image: 'https://covers.openlibrary.org/b/id/8231986-L.jpg',
        addedDate: '2025-12-10',
    },
    {
        id: '3',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        price: 52.00,
        condition: 'Excellent',
        category: 'Classic Literature',
        stock: 2,
        image: 'https://covers.openlibrary.org/b/id/8231984-L.jpg',
        addedDate: '2025-11-25',
    },
];

export const getSellerProfile = async () => {
    await delay();

    return {
        id: 'seller-001',
        name: 'Classic Books Store',
        email: 'seller@classicbooks.com',
        phone: '+1 234 567 8900',
        address: '456 Book St, Boston, MA 02101',
        avatar: 'https://ui-avatars.com/api/?name=Classic+Books&background=random',
        rating: 4.8,
        totalSales: 156,
        joinedDate: '2024-03-20',
        bio: 'Specializing in rare and vintage classic literature since 2024.',
    };
};

export const updateSellerProfile = async (profileData) => {
    await delay();

    return {
        ...profileData,
        id: 'seller-001',
    };
};

export const addBook = async (bookData) => {
    await delay();

    const newBook = {
        id: Math.random().toString(36).substr(2, 9),
        ...bookData,
        addedDate: new Date().toISOString().split('T')[0],
    };

    return newBook;
};

export const getMyListings = async () => {
    await delay();
    return mockListings;
};

export const updateBook = async (id, bookData) => {
    await delay();

    return {
        id,
        ...bookData,
    };
};

export const deleteBook = async (id) => {
    await delay();
    return { success: true };
};

export const getEarnings = async () => {
    await delay();

    return {
        totalEarnings: 8450.50,
        thisMonth: 1234.00,
        lastMonth: 987.50,
        pending: 345.00,
        chartData: [
            { month: 'Jan', earnings: 850 },
            { month: 'Feb', earnings: 1200 },
            { month: 'Mar', earnings: 980 },
            { month: 'Apr', earnings: 1500 },
            { month: 'May', earnings: 1100 },
            { month: 'Jun', earnings: 1234 },
        ],
    };
};
