import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "https://fake-api.tractian.com",
});

/**
 * Fetches all companies from the API.
 * @returns A list of companies.
 */
export const fetchCompanies = async () => {
  const response = await api.get<{ id: string; name: string }[]>("/companies");
  return response.data;
};

/**
 * Fetches locations for a specific company.
 * @param companyId The ID of the company.
 * @returns A list of locations.
 */
export const fetchLocations = async (companyId: string) => {
  const response = await api.get(`/companies/${companyId}/locations`);
  return response.data;
};

/**
 * Fetches assets for a specific company.
 * @param companyId The ID of the company.
 * @returns A list of assets.
 */
export const fetchAssets = async (companyId: string) => {
  const response = await api.get(`/companies/${companyId}/assets`);
  return response.data;
};

export default api;
