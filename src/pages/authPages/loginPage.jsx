import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/services/authServices";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await login(email, password, navigate);
      if (!response || response.error) {
        throw new Error(response?.message || "Login failed: Invalid credentials");
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400: setErrorMessage("Missing email or password."); break;
          case 401: setErrorMessage("Invalid email or password."); break;
          case 403: setErrorMessage("Account not authorized."); break;
          case 429: setErrorMessage("Too many attempts. Try later."); break;
          default:
            setErrorMessage(err.response.data?.message || `Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        setErrorMessage("No response from server.");
      } else {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-white via-green-50 to-green-200 overflow-hidden">

      {/* Floating Orbs */}
      <div className="absolute w-[400px] h-[400px] bg-green-200 opacity-30 blur-[140px] top-[5%] left-[10%] animate-pulse-slow rounded-full"></div>
      <div className="absolute w-[350px] h-[350px] bg-green-300 opacity-25 blur-[130px] bottom-[10%] right-[15%] animate-pulse-slow rounded-full"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-100 opacity-25 blur-[120px] bottom-[20%] left-[20%] animate-pulse-slow rounded-full"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-green-600 font-semibold">Welcome Back</h2>
          <h2 className="text-green-700 font-bold text-2xl mb-2">SPORTIFY</h2>
          <h1 className="text-left font-bold text-lg text-green-700">LOGIN</h1>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white py-3 rounded-full font-bold hover:scale-105 transition shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-5 text-sm">
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Don't have an account? <b>Register</b>
          </Link>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Sportify
        </div>
      </div>

      {/* Animation style */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite;
        }
      `}</style>
    </div>
  );
}