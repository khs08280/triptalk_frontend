import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { SignUpRequest, SignUpResponse, signUpUser } from "@/api/AuthApi";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success message
  const navigate = useNavigate();

  const mutation = useMutation<SignUpResponse, AxiosError, SignUpRequest>({
    mutationFn: async (newUser: SignUpRequest) => {
      return signUpUser(newUser);
    },
    onSuccess: (data) => {
      console.log("Success:", data);
      setSuccessMessage(data.message || "Signup successful!");
      setErrorMessage("");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (error: AxiosError) => {
      console.error("Error:", error);
      setErrorMessage(
        (error.response?.data as SignUpResponse)?.message ||
          "An error occurred during signup.",
      );
      setSuccessMessage("");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const newUser: SignUpRequest = {
      username,
      email,
      nickname,
      password,
      confirmPassword,
    };

    mutation.mutate(newUser);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-(--header-height)">
      <form
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">회원 가입</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            아이디:
          </label>
          <input
            type="text"
            id="username"
            className="w-full rounded-lg border px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full rounded-lg border px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            이메일:
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="nickname" className="block text-gray-700">
            닉네임:
          </label>
          <input
            type="text"
            id="nickname"
            className="w-full rounded-lg border px-3 py-2"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          {mutation.isPending ? "가입 중..." : "회원 가입"}
        </button>
        {errorMessage && (
          <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="mt-2 text-sm text-green-500">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
