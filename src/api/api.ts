import axios from "axios";

const api = axios.create({
  baseURL: "https://www.triptalk-server.shop/api/v1",
  withCredentials: true,
});

async function requestRefreshToken(): Promise<boolean> {
  try {
    const response = await api.post("/auth/refresh");
    console.log("Refresh");
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;
    const originalRequest = error.config;
    if (originalRequest.url === "/auth/checkLogin") {
      return Promise.reject(error);
    }
    if (status === 401) {
      if (originalRequest._retry) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (originalRequest.url === "/auth/refresh") {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const success = await requestRefreshToken();
        if (!success) {
          window.location.href = "/login";
          return Promise.reject(error);
        }
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
