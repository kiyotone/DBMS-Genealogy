import { api } from "../config";

export const getEvent = async () => {
    try {
        const response = await api.get('/event/'); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

export const getEventMember = async (id) => {
    try {
        const response = await api.get(`/event/${id}`); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

export const addEvent = async (data) => {
    try {
        const response = await api.post('/event/', data); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error);
    }
}
