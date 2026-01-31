import Cookies from 'js-cookie';

export const getUserFromToken = () => {
    const token = Cookies.get('accessToken');
    if (!token) return null;

    try {
        // In a real app, this would decode the JWT.
        // For our mock, we'll try to retrieve user info from another cookie or localStorage
        // Or decode the base64 mock token if possible.
        const userEmail = Cookies.get('userEmail');
        const role = Cookies.get('roleName');
        const userId = Cookies.get('userId');

        if (userEmail && role) {
            return {
                email: userEmail,
                role: role,
                id: userId
            };
        }
        return null;
    } catch (error) {
        return null;
    }
};
