import Cookies from 'js-cookie';

export const getToken = () => {
    return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
    return Cookies.get('refreshToken');
};

export const setToken = (accessToken, refreshToken) => {
    if (accessToken) {
        Cookies.set('accessToken', accessToken, {
            secure: window.location.protocol === 'https:',
            sameSite: 'Strict'
        });
    }
    if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, {
            secure: window.location.protocol === 'https:',
            sameSite: 'Strict'
        });
    }
};

export const removeToken = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('role');
    Cookies.remove('userId');
};
