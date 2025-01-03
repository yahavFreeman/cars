import Axios from "axios";
import { store } from "../store"; // Import the store for the access token

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3001/api/";

var axios = Axios.create({
  withCredentials: true,
});

// Attach an interceptor to handle 401 errors and refresh tokens
axios.interceptors.response.use(
  (config) => {
    const { accessToken } = store.getState().userModule; // acces the store's state
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired accessToken
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      try {
        const refreshResponse = await axios.post("/api/refresh-token", null, {
          withCredentials: true, // Send cookies (refresh token)
        });
        const newAccessToken = refreshResponse.data.accessToken;

        // Update the header for the original request and retry it
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axios(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Optionally handle token refresh failure (e.g., logout the user)
        return Promise.reject(refreshError);
      }
    }
  }
);

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "GET", data = null) {
  try {
    const state = store.getState();
    const accessToken = state.userModule?.accessToken; // Update this path to match your state structure
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    );
    console.dir(err);
    throw err;
  }
}
