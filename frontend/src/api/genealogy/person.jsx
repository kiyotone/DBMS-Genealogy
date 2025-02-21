import { api } from "../config";

export const getPerson = async () => {
  try {
    const response = await api.get("/person/"); // Make sure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getPersonMember = async (id) => {
  try {
    const response = await api.get(`/person/${id}`); // Make sure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const addPersonMember = async (data) => {
  try {
    console.log("Data from addPersonMember:", data);
    const response = await api.post("person", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from addPersonMember:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding person member:", error);
  }
};

export const getHierarchyLevel = async (id) => {
  try {
    const response = await api.get(`/person/${id}/hierarchy`); // Make sure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getDescendants = async (id) => {
  try {
    const response = await api.get(`/person/${id}/descendants`); // Make sure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
