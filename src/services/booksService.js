// Mock delay to simulate API call
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock book data
const mockBooks = [
    {
        id: '1',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        year: 1813,
        price: 45.99,
        condition: 'Good',
        category: 'Classic Literature',
        description: 'A timeless romance novel exploring themes of love, class, and society in Regency England.',
        image: 'https://covers.openlibrary.org/b/id/8231986-L.jpg',
        seller: { id: 's1', name: 'Classic Books Store', rating: 4.8 },
        stock: 3,
        rating: 4.7,
        reviews: 45,
    },
    {
        id: '2',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        price: 38.50,
        condition: 'Very Good',
        category: 'Classic Literature',
        description: 'A critique of the American Dream set in the Jazz Age, following the mysterious Jay Gatsby.',
        image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        seller: { id: 's2', name: 'Vintage Reads', rating: 4.9 },
        stock: 5,
        rating: 4.8,
        reviews: 89,
    },
    {
        id: '3',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        price: 52.00,
        condition: 'Excellent',
        category: 'Classic Literature',
        description: 'A powerful story of racial injustice and childhood innocence in the American South.',
        image: 'https://covers.openlibrary.org/b/id/8231984-L.jpg',
        seller: { id: 's1', name: 'Classic Books Store', rating: 4.8 },
        stock: 2,
        rating: 4.9,
        reviews: 156,
    },
    {
        id: '4',
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        price: 42.75,
        condition: 'Good',
        category: 'Science Fiction',
        description: 'A dystopian masterpiece depicting a totalitarian future society under constant surveillance.',
        image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        seller: { id: 's3', name: 'Rare Books Co.', rating: 4.7 },
        stock: 4,
        rating: 4.8,
        reviews: 203,
    },
    {
        id: '5',
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        year: 1847,
        price: 48.99,
        condition: 'Very Good',
        category: 'Classic Literature',
        description: 'A Gothic romance following the experiences of the orphaned Jane Eyre.',
        image: 'https://covers.openlibrary.org/b/id/8231986-L.jpg',
        seller: { id: 's2', name: 'Vintage Reads', rating: 4.9 },
        stock: 3,
        rating: 4.6,
        reviews: 78,
    },
    {
        id: '6',
        title: 'Moby-Dick',
        author: 'Herman Melville',
        year: 1851,
        price: 65.00,
        condition: 'Fair',
        category: 'Adventure',
        description: 'The epic tale of Captain Ahab\'s obsessive quest to hunt the white whale.',
        image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        seller: { id: 's3', name: 'Rare Books Co.', rating: 4.7 },
        stock: 1,
        rating: 4.5,
        reviews: 34,
    },
];

export const getBooks = async (filters = {}) => {
    await delay();

    let filteredBooks = [...mockBooks];

    // Apply filters
    if (filters.category) {
        filteredBooks = filteredBooks.filter(b => b.category === filters.category);
    }

    if (filters.condition) {
        filteredBooks = filteredBooks.filter(b => b.condition === filters.condition);
    }

    if (filters.priceRange) {
        filteredBooks = filteredBooks.filter(
            b => b.price >= filters.priceRange.min && b.price <= filters.priceRange.max
        );
    }

    // Sort
    if (filters.sortBy === 'price-low') {
        filteredBooks.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
        filteredBooks.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
        filteredBooks.sort((a, b) => b.rating - a.rating);
    }

    return {
        books: filteredBooks,
        pagination: {
            currentPage: 1,
            totalPages: Math.ceil(filteredBooks.length / 12),
            totalBooks: filteredBooks.length,
            booksPerPage: 12,
        },
    };
};

export const getBookById = async (id) => {
    await delay();

    const book = mockBooks.find(b => b.id === id);

    if (!book) {
        throw new Error('Book not found');
    }

    return book;
};

export const searchBooks = async (query) => {
    await delay();

    const lowerQuery = query.toLowerCase();
    const results = mockBooks.filter(
        b =>
            b.title.toLowerCase().includes(lowerQuery) ||
            b.author.toLowerCase().includes(lowerQuery) ||
            b.category.toLowerCase().includes(lowerQuery)
    );

    return { books: results };
};

export const filterBooks = async (filters) => {
    return getBooks(filters);
};
