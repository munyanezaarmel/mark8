import axios from "axios";

const API_URL = "https://api.mark8.awesomity.rw";

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface ApiResponse {
  data: any;
  message: string;
}

interface FetchOptions {
  pageNumber?: number;
  recordsPerPage?: number;
}
interface FetchProductsParams {
  pageNumber?: number;
  recordsPerPage?: number;
}

export const signUp = async (userData: any): Promise<ApiResponse> => {
  try {
    console.log("Sending user data:", userData);
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during signup:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async (userData: any): Promise<ApiResponse> => {
  try {
    console.log("Sending user data:", userData);
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    console.log("API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const fetchCategories = async (options?: FetchOptions): Promise<ApiResponse> => {
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
}: FetchProductsParams): Promise<any> => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get<any>(
    `${API_URL}/products?pageNumber=${pageNumber}&recordsPerPage=${recordsPerPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
// export const fetchProducts = async ({ pageParam = 1 }): Promise<any> => {
//   const token = sessionStorage.getItem("accessToken");

//   if (!token) {
//     throw new Error("No token found");
//   }

//   const response = await axios.get(
//     `${API_URL}/products?pageNumber=${pageParam}&recordsPerPage=10`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return {
//     ...response.data,
//     nextCursor: response.data.products.length < 10 ? undefined : pageParam + 1,
//   };
// };

export const fetchProductDetails = async (id: any): Promise<any> => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const fetchStores = async (): Promise<ApiResponse> => {
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

export const fetchStoreProducts = async (
  storeId: string,
  pageNumber = 1,
  recordsPerPage = 3
) => {
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
export const fetchProductsByCategory = async (
  categoryId: string,
  pageNumber = 1,
  recordsPerPage = 3
) => {
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
