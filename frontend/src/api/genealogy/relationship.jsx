import { api } from "../config";

export const getRelationship = async () => {
    try {
        const response = await api.get('/relationship/'); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

export const getRelationshipMember = async (id) => {
    try {
        const response = await api.get(`/relationship/${id}`); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

export const addRelationshipMember = async (data) => {
    try {
        const response = await api.post('/relationship/', data); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error adding relationship member:", error);
    }
};