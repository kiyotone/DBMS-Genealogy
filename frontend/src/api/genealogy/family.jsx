import { api } from "../config";

export const getFamily = async () => {
    try {
        const response = await api.get('/family/'); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

export const getFamilyMember = async (id) => {
    try {
        const response = await api.get(`/family/${id}`); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

export const addFamilyMember = async (data) => {
    try {
        const response = await authenticated.post('/family/', data); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error adding family member:", error);
    }
};