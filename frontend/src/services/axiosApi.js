import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

    if (
      error.code === "ECONNABORTED" &&
      originalRequest.method === "get"
    ) {
      console.log("⏱️ Timeout occurred");

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        console.log("🔁 Retrying request...");

        return axiosApi(originalRequest);
      }
    }

    if (!error.response) {
      console.log("🌐 Network error");
    }

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          console.log("Unauthorized");
          break;

        case 500:
          console.log("Server error");
          break;

        default:
          console.log("Other error:", status);
      }
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosApi;