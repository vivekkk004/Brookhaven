const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mockReviews = [
    {
        id: 'rev-001',
        bookId: '1',
        userId: 'user-001',
        userName: 'John Doe',
        userAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        rating: 5,
        comment: 'Excellent condition! Exactly as described. Fast shipping.',
        date: '2026-01-15T10:00:00Z',
    },
    {
        id: 'rev-002',
        bookId: '1',
        userId: 'user-002',
        userName: 'Jane Smith',
        userAvatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
        rating: 4,
        comment: 'Good book, slight wear on the cover but overall great purchase.',
        date: '2026-01-12T14:30:00Z',
    },
];

export const getBookReviews = async (bookId) => {
    await delay();

    return mockReviews.filter(r => r.bookId === bookId);
};

export const addReview = async (bookId, reviewData) => {
    await delay();

    const newReview = {
        id: 'rev-' + Math.random().toString(36).substr(2, 9),
        bookId,
        userId: 'current-user',
        userName: 'Current User',
        userAvatar: 'https://ui-avatars.com/api/?name=Current+User&background=random',
        ...reviewData,
        date: new Date().toISOString(),
    };

    return newReview;
};

export const updateReview = async (reviewId, reviewData) => {
    await delay();

    return {
        id: reviewId,
        ...reviewData,
        date: new Date().toISOString(),
    };
};

export const deleteReview = async (reviewId) => {
    await delay();

    return { success: true };
};
