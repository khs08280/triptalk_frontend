import axios from "axios";

export interface SignUpRequest {
  username: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword?: string;
}
export interface SignUpResponse {
  success: boolean;
  message: string;
  data: {
    username: string;
    nickname: string;
    email: string;
  };
}
export const signUpUser = async (newUser: SignUpRequest) => {
  const response = await axios.post<SignUpResponse>(
    "http://localhost:8080/api/v1/auth/signup",
    newUser,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Signup failed");
  }
  return response.data;
};

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      nickname: string;
      email: string;
    };
  };
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "http://localhost:8080/api/v1/auth/login", // 실제 로그인 API 엔드포인트
    data,
  );
  if (!response.data.success) {
    throw new Error(response.data.message || "Login failed");
  }
  return response.data;
};
