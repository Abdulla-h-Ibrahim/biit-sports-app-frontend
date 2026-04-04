import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "@/services/authServices";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [arid, setArid] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("player");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAridChange = (e) => {
    let value = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
    let year = value.slice(0, 4);
    let remaining = value.slice(4).replace(/^arid/i, "");
    let formatted = "";
    if (year) formatted += year;
    if (value.length > 4) formatted += "-Arid";
    if (remaining) formatted += "-" + remaining.slice(0, 4);
    formatted = formatted.replace(/arid/i, "Arid");
    setArid(formatted);
    if (formatted.length > 0) setEmail(`${formatted.toLowerCase()}@biit.edu.pk`);
    else setEmail("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!/^20\d{2}-Arid-\d{4}$/i.test(arid)) {
      setErrorMessage("ARID number must be like 20xx-Arid-xxxx.");
      return;
    }
    setLoading(true);
    try {
      const response = await register({ name, arid_no: arid, age, email, password, role, gender });
      if (response.error) throw new Error(response.message);
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f0fdf4] overflow-hidden">

      {/* Background blobs */}
      <div className="absolute w-[400px] h-[400px] bg-green-400/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-float"></div>
      <div className="absolute w-[350px] h-[350px] bg-emerald-500/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px] animate-float delay-2000"></div>

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden backdrop-blur-[30px] bg-white/20 border border-white/30 shadow-[0_25px_80px_rgba(0,0,0,0.2)]">

        {/* Left Side - Gradient Info Panel */}
        <div className="hidden md:flex flex-col justify-center items-center text-center p-10
          bg-gradient-to-br from-green-700 via-emerald-600 to-green-900 text-white relative overflow-hidden">

          <div className="absolute w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full top-[-200px] right-[-200px] animate-pulse"></div>
          <div className="absolute w-[300px] h-[300px] bg-green-300/20 blur-[100px] rounded-full bottom-[-100px] left-[-100px] animate-float"></div>

          <h2 className="text-4xl font-extrabold mb-5 tracking-wide">WELCOME TO BIIT SPORTS⚡</h2>

          <p className="text-green-100 mb-6 max-w-xs leading-relaxed">
            Become a part of our vibrant community! Join tournaments, track your stats, and show your skills.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-md">🏆 Tournaments</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-md">📊 Stats</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-md">🤝 Community</span>
          </div>

          <div className="w-16 h-[2px] bg-white/30 mb-4"></div>
          <div className="text-green-200 text-sm tracking-widest">BIIT SPORTS SOCIETY</div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-10">
          <div className="text-center mb-6">
            <h2 className="text-green-600 font-semibold text-sm tracking-wide uppercase mb-0">
              Join the Community
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-2">
              BIIT SPORTS SOCIETY
            </h1>
            <h2 className="text-green-600 font-semibold text-sm tracking-wide mb-4">
              Register your account
            </h2>
            <div className="mx-auto mt-2 w-16 h-[3px] rounded-full bg-green-500"></div>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 w-full">

            {/* Full-width fields */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />

            <input
              type="text"
              placeholder="ARID Number (20xx-Arid-xxxx)"
              className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={arid}
              onChange={handleAridChange}
              disabled={loading}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              readOnly
              disabled={loading}
              required
            />

            {/* Passwords row: 2 columns */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Age / Role / Gender row: 3 columns */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <input
                type="number"
                placeholder="Age"
                min={10}
                max={100}
                className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={loading}
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md"
                disabled
              >
                <option value="player">Player</option>
              </select>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-white/30 rounded-lg bg-white/50 backdrop-blur-md"
                disabled={loading}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit button */}
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
                {loading ? "Registering..." : "Register"}
              </span>
            </button>

          </form>

          <div className="text-center mt-5 text-sm">
            <Link to="/login" className="text-green-700 font-medium hover:underline">
              Already have an account? <b>Login</b>
            </Link>
          </div>

          <div className="text-center mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} BIIT Sports Society
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {0%,100%{transform:scale(1);opacity:0.25}50%{transform:scale(1.05);opacity:0.3}}
        .animate-pulse-slow{animation:pulse-slow 10s infinite}
        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
        .animate-float{animation:float 6s ease-in-out infinite}
      `}</style>
    </div>
  );
}