// Mock delay to simulate API call
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock auth service
export const login = async (credentials) => {
    await delay();

    const { email, password } = credentials;

    // Mock validation
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Mock user data based on email
    const isSeller = email.includes('seller');

    const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: isSeller ? 'user' : 'customer',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
    };

    const token = 'mock_jwt_token_' + btoa(JSON.stringify(user));

    return { user, token };
};

export const register = async (userData) => {
    await delay();

    const { email, password, name, role } = userData;

    // Mock validation
    if (!email || !password || !name) {
        throw new Error('All fields are required');
    }

    const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: role || 'customer',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
    };

    const token = 'mock_jwt_token_' + btoa(JSON.stringify(user));

    return { user, token };
};

export const logout = async () => {
    await delay(300);
    return { success: true };
};

export const checkAuth = async () => {
    await delay(500);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        throw new Error('Not authenticated');
    }

    return { user: JSON.parse(user) };
};
