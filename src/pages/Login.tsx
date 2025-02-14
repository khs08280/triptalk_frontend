// Login.tsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AxiosError } from "axios";
import { loginSuccess } from "@/features/auth/authSlice";
import { LoginRequest, LoginResponse, loginUser } from "@/api/AuthApi";
import { store } from "@/store/store";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const mutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      return loginUser(loginData);
    },

    onSuccess: (data) => {
      console.log("Login successful:", data);
      dispatch(loginSuccess(data.data.user));
      navigate("/myHome");
      console.log("Login successful:", data, store.getState().auth.isLoggedIn);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      setErrorMessage(
        (error.response?.data as LoginResponse)?.message ||
          "An error occurred during login.",
      );
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(""); // 이전 에러 메시지 초기화

    if (username === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    mutation.mutate({ username, password }); // mutation 실행
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-(--header-height)">
      <form
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">로그인</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            아이디
          </label>
          <input
            type="text" // type을 "text"로 변경
            id="username"
            className="w-full rounded-lg border px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            className="w-full rounded-lg border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          disabled={mutation.isPending} // 로딩 중일 때 버튼 비활성화
        >
          {mutation.isPending ? "로그인 중..." : "로그인"}
        </button>
        {errorMessage && ( // 에러 메시지 표시
          <p className="mt-2 text-red-500">{errorMessage}</p>
        )}
        <p className="mt-4 text-center">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
