import axios from "axios";

const API_URL = "https://api.mark8.awesomity.rw";

export const signUp = async (userData) => {
  try {
    console.log("Sending user data:", userData);
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async (userData) => {
  try {
    console.log("Sending user data:", userData);
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchCategories = async () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchProducts = async ({
  pageNumber = 1,
  recordsPerPage = 10,
}) => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(
    `${API_URL}/products?pageNumber=${pageNumber}&recordsPerPage=${recordsPerPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchProductDetails = async (id) => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(
    `${API_URL}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const fetchStores = async () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/store`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};


export const fetchStoreProducts = async (storeId, pageNumber = 1, recordsPerPage = 3) => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        storeId,
        pageNumber,
        recordsPerPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching store products:", error);
    throw error;
  }
};
export const fetchProductsByCategory = async (categoryId, pageNumber = 1, recordsPerPage = 3) => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        categoryId,
        pageNumber,
        recordsPerPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};