import { api } from "../api/config";

export const testLoad = async () => {
    try {
        const response = await api.get('/family/'); // Make sure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error("Error loading data:", error);
    }
};
