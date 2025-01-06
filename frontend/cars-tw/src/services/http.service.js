import Axios from "axios";
import { store } from "../store"; // Import the store for the access token

const BASE_URL =
  "//localhost:3001/api/";

var axios = Axios.create({
  withCredentials: true,
});

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
