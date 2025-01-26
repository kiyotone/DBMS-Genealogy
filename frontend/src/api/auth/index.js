
import axios from '../axios';

const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
    }

const register = async (email, password, first_name, last_name) => {
    try {
        const response = await axios.post('/auth/register', { email, password, first_name, last_name });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const logout = async () => {
    try {
        const response = await axios.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
}