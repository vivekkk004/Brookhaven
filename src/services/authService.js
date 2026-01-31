// Mock auth service used when no backend is checking
import Cookies from "js-cookie";

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const isTokenExpired = () => {
    const token = Cookies.get("accessToken");
    if (!token) return true;
    return false;
};

export const refreshAccessToken = async () => {
    await delay(500);
    return Cookies.get("accessToken");
};

export const loginUser = async (loginId, password) => {
    await delay(1000); // Simulate network request

    // Mock validation
    // Allow any login for demo purposes
    if (!loginId || !password) {
        throw new Error('Email and password are required');
    }

    // Mock successful login
    const isSeller = loginId.toLowerCase().includes('seller');
    const role = isSeller ? 'user' : 'customer';
    const userId = 'mock-' + Math.random().toString(36).substr(2, 9);

    const mockUser = {
        _id: userId,
        email: loginId,
        roleName: role,
        name: loginId.split('@')[0],
    };

    // Fake token structure to satisfy "dynamic" look
    const fakeTokenPart = btoa(JSON.stringify(mockUser));
    const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${fakeTokenPart}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    const refreshToken = `mock_refresh_token_${Date.now()}`;

    // Set Cookies as expected by the new implementation
    Cookies.set("accessToken", accessToken, { secure: false, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { secure: false, sameSite: "Strict" });
    Cookies.set("role", role);
    Cookies.set("userid", userId);

    return {
        accessToken,
        refreshToken,
        role,
        email: loginId,
        userid: userId,
        user: mockUser
    };
};

export const registerUser = async (userData) => {
    await delay(1000);

    const { email, role, name } = userData;
    const userId = 'mock-' + Math.random().toString(36).substr(2, 9);

    const mockUser = {
        _id: userId,
        email,
        roleName: role || 'customer',
        name: name || email.split('@')[0],
    };

    const fakeTokenPart = btoa(JSON.stringify(mockUser));
    const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${fakeTokenPart}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
    const refreshToken = `mock_refresh_token_${Date.now()}`;

    Cookies.set("accessToken", accessToken, { secure: false, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { secure: false, sameSite: "Strict" });
    Cookies.set("role", mockUser.roleName);
    Cookies.set("userid", userId);

    return {
        accessToken,
        refreshToken,
        role: mockUser.roleName,
        email,
        userid: userId,
        user: mockUser
    };
};

export const logoutUser = async () => {
    await delay(500);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("role");
    Cookies.remove("userid");
    // window.location.href = "/"; // Let the component handle navigation if preferred, or uncomment
};

export const fetchCurrentUser = async (userId) => {
    await delay(500);
    // Mock return current user details
    return {
        data: {
            _id: userId,
            name: "Mock User",
            email: "mock@example.com",
            role: Cookies.get("role") || "customer"
        }
    };
};

// Legacy exports if still used
export const login = loginUser;
export const register = registerUser;
export const logout = logoutUser;
export const checkAuth = async () => {
    const token = Cookies.get("accessToken");
    if (!token) throw new Error("Not authenticated");
    return { user: { role: Cookies.get("role") } };
};