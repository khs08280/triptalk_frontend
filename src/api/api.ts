import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8443/api/v1",
  withCredentials: true, // 쿠키 자동 전송
});

// 2) Refresh Token 요청 함수 (별도 작성)
async function requestRefreshToken(): Promise<boolean> {
  try {
    const response = await api.post("/auth/refresh");
    // 응답이 200이면 Access Token 재발급 성공
    return response.status === 200;
  } catch (error) {
    // 재발급 실패
    return false;
  }
}

// 3) Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;
    const originalRequest = error.config;

    // (1) 401 오류 처리
    if (status === 401) {
      // (a) 만약 이미 retry 시도한 요청이라면 -> 무한루프 방지 위해 바로 reject
      if (originalRequest._retry) {
        // 여기서 refresh 요청마저 401이면 -> 로그인 페이지 이동 등
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // (b) refresh API 자체가 401을 뱉은 경우 -> 재시도해봐야 또 401 -> 로그인 이동
      if (originalRequest.url === "/auth/refresh") {
        // refresh마저 401이면 토큰 만료, 재로그인 필요
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // (c) 최초 한 번만 재시도
      originalRequest._retry = true;

      // (d) refreshToken 요청 시도
      try {
        const success = await requestRefreshToken();
        if (!success) {
          // refresh 실패 -> 로그인 이동
          window.location.href = "/login";
          return Promise.reject(error);
        }
        // (e) refresh 성공 -> 원래 요청 다시 수행
        return api(originalRequest);
      } catch (refreshError) {
        // refresh 로직 자체 에러 (네트워크 등)
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // (2) 그 외 에러는 그대로
    return Promise.reject(error);
  },
);

export default api;
