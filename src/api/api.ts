import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

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
  (response: AxiosResponse) => {
    // 정상 응답 그대로 반환
    return response;
  },
  async (error: AxiosError) => {
    // 에러 응답 처리
    if (error.response && error.response.status === 401) {
      /**
       * 401인 경우 → Access Token 만료 등
       *  1) Refresh Token으로 재발급 요청
       *  2) 성공하면 원래 요청 재시도
       *  3) 실패하면 로그인 페이지로 이동
       */

      // (a) 이미 재시도를 한 번 한 요청인지 체크(무한 루프 방지)
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      if (!originalRequest._retry) {
        originalRequest._retry = true; // 재시도 플래그

        const success = await requestRefreshToken();
        if (success) {
          // (b) 재발급 성공 → 원래 요청을 다시 시도
          return api(originalRequest);
        }
      }

      // (c) 재발급 실패 or 이미 재시도 → 로그인 페이지로 이동
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 401 외 다른 에러들은 그대로 전달
    return Promise.reject(error);
  },
);

export default api;
