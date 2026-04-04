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
      if (!response || response.error) throw new Error("Login failed");
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f0fdf4] overflow-hidden">

      {/* ===== MANY BACKGROUND BLOBS =====

      {/* ===== PREMIUM BACKGROUND BLOBS ===== */}

      {/* Large soft blobs */}
      <div className="absolute w-[400px] h-[400px] bg-green-400/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-float"></div>
      <div className="absolute w-[350px] h-[350px] bg-emerald-500/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px] animate-float delay-2000"></div>

      {/* Medium blobs */}
      <div className="absolute w-[250px] h-[250px] bg-green-300/30 rounded-full blur-[100px] top-[20%] right-[15%] animate-float delay-1000"></div>
      <div className="absolute w-[200px] h-[200px] bg-emerald-400/30 rounded-full blur-[90px] bottom-[20%] left-[10%] animate-float delay-3000"></div>

      {/* Small accent blobs */}
      <div className="absolute w-[120px] h-[120px] bg-green-500/40 rounded-full blur-[80px] top-[50%] left-[40%] animate-float"></div>
      <div className="absolute w-[100px] h-[100px] bg-emerald-300/40 rounded-full blur-[70px] top-[30%] right-[40%] animate-float delay-2000"></div>
      {/* Center glow */}
      <div className="absolute pointer-events-none w-[500px] h-[500px] bg-green-200/20 blur-[60px] rounded-full"></div>

      {/* ===== GLASS CARD ===== */}
      <div
        className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 
        rounded-3xl overflow-hidden
        backdrop-blur-[30px] bg-white/20
        border border-white/30
        shadow-[0_25px_80px_rgba(0,0,0,0.2)]
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-40
        before:pointer-events-none"
      >

        {/* ===== LEFT SIDE ===== */}
        <div className="p-8 md:p-10">

          <div className="mb-8 text-center">
            {/* Small label */}
            <h2 className="text-green-600 font-semibold text-sm tracking-wide uppercase mb-0">
              Hey👋... Welcome back to
            </h2>

            {/* Main heading */}
            <h1 className="text-3xl md:text-2xl font-extrabold text-green-700 mb-2">
              BIIT SPORTS SOCIETY
            </h1>

            {/* Subheading */}
            <h2 className="text-green-600 font-semibold text-sm tracking-wide uppercase mb-2">
              Login to your account
            </h2>

            {/* Decorative line */}
            <div className="mx-auto mt-4 w-16 h-[3px] rounded-full bg-green-500"></div>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/50 border border-white/40
                backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/50 border border-white/40
                backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-3 rounded-full font-semibold text-white overflow-hidden
                bg-gradient-to-r from-green-600 via-emerald-500 to-green-700
                shadow-lg hover:shadow-2xl transition-all duration-300
                hover:scale-[1.03] active:scale-[0.98]"
            >
              {/* Shine Effect */}
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-500 blur-md"></span>

              {/* Moving Light Sweep */}
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute left-[-100%] top-0 h-full w-1/2 bg-white/30 skew-x-[-20deg] animate-shine"></span>
              </span>

              <span className="relative z-10">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>
          </form>

          <div className="text-center mt-5 text-sm">
            <Link to="/register" className="text-green-700 font-medium hover:underline">
              Don't have an account? <b>Register</b>
            </Link>
          </div>
        </div>

        {/* ===== RIGHT SIDE ===== */}
        <div className="hidden md:flex flex-col justify-center items-center text-center p-10
bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 text-white relative overflow-hidden">

          {/* Animated background glow */}
          <div className="absolute w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full top-[-200px] right-[-200px] animate-pulse"></div>
          <div className="absolute w-[300px] h-[300px] bg-green-300/20 blur-[100px] rounded-full bottom-[-100px] left-[-100px] animate-float"></div>

          {/* Floating circles */}
          <div className="absolute w-20 h-20 border border-white/20 rounded-full top-10 left-10 animate-float"></div>
          <div className="absolute w-10 h-10 border border-white/20 rounded-full bottom-10 right-10 animate-float delay-2000"></div>

          {/* Content */}
          <h2 className="text-4xl font-extrabold mb-5 tracking-wide">
            LEVEL UP YOUR GAME⚡
          </h2>

          <p className="text-green-100 mb-6 max-w-xs leading-relaxed">
            Join tournaments, track your performance, and compete with the best players at BIIT.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-md">🏆 Tournaments</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-md">📊 Stats</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-md">🔥 Rankings</span>
          </div>

          {/* Divider */}
          <div className="w-16 h-[2px] bg-white/30 mb-4"></div>

          <div className="text-green-200 text-sm tracking-widest">
            BIIT SPORTS SOCIETY
          </div>
        </div>
      </div>
    </div>
  );
}