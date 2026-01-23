const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mockWishlist = [
    {
        id: 'wish-001',
        bookId: '4',
        book: {
            id: '4',
            title: '1984',
            author: 'George Orwell',
            price: 42.75,
            condition: 'Good',
            image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        },
        addedDate: '2026-01-19T12:00:00Z',
    },
    {
        id: 'wish-002',
        bookId: '5',
        book: {
            id: '5',
            title: 'Jane Eyre',
            author: 'Charlotte Brontë',
            price: 48.99,
            condition: 'Very Good',
            image: 'https://covers.openlibrary.org/b/id/8231986-L.jpg',
        },
        addedDate: '2026-01-18T15:30:00Z',
    },
];

let wishlistData = [...mockWishlist];

export const getWishlist = async () => {
    await delay();
    return wishlistData;
};

export const addToWishlist = async (bookId) => {
    await delay();

    // Mock book data
    const newItem = {
        id: 'wish-' + Math.random().toString(36).substr(2, 9),
        bookId,
        book: {
            id: bookId,
            title: 'Sample Book',
            author: 'Sample Author',
            price: 29.99,
            condition: 'Good',
            image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        },
        addedDate: new Date().toISOString(),
    };

    wishlistData.push(newItem);
    return newItem;
};

export const removeFromWishlist = async (bookId) => {
    await delay();

    wishlistData = wishlistData.filter(item => item.bookId !== bookId);
    return { success: true };
};

export const clearWishlist = async () => {
    await delay();

    wishlistData = [];
    return { success: true };
};
