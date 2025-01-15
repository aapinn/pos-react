"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        router.push("/menu");
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 1500);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-80">
        <h2 className="text-center text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                error && !username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                error && !password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs text-center">
              Username atau password salah
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white rounded-md ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Login
          </button>
        </form>
      </div>

      {/* Popup Spinner */}
      {isLoading && (
        <div className="fixed inset-0 border flex justify-center items-center">
          <div className="bg-white w-fit border-1 p-3 rounded-lg border-nmeutral-400">
            <div className="spinner"></div>
          </div>
        </div>
      )}

      {/* Spinner Styling */}
      <style>
        {`
      .spinner {
        width: 56px;
        height: 56px;
        display: grid;
        border: 4.5px solid #0000;
        border-radius: 50%;
        border-right-color: #474bff;
        animation: spinner-a4dj62 1s infinite linear;
      }

      .spinner::before,
      .spinner::after {
        content: "";
        grid-area: 1/1;
        margin: 2.2px;
        border: inherit;
        border-radius: 50%;
        animation: spinner-a4dj62 2s infinite;
      }

      .spinner::after {
        margin: 8.9px;
        animation-duration: 3s;
      }

      @keyframes spinner-a4dj62 {
        100% {
            transform: rotate(1turn);
        }
      }-
        `}
      </style>
    </div>
  );
};

export default Login;
