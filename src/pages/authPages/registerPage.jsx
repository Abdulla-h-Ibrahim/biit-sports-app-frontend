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
  const [role, setRole] = useState("Player");
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Format ARID automatically: 20xx-Arid-xxxx
  const handleAridChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
    // Automatically insert dashes after year and "ARID"
    if (value.length > 4 && !value.includes("-ARID-")) {
      value = `${value.slice(0, 4)}-ARID-${value.slice(4, 8)}`;
    }
    setArid(value.slice(0, 13)); // Limit to 13 chars
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!/^20\d{2}-ARID-\d{4}$/.test(arid)) {
      setErrorMessage("ARID number must be like 20xx-ARID-xxxx.");
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        name,
        arid_no: arid,
        age,
        email,
        password,
        role,
        gender,
      });
      if (response.error) {
        throw new Error(response.message);
      }
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message || "Registration failed");
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

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-green-600 font-semibold">Join the Community</h2>
          <h2 className="text-green-700 font-bold text-2xl mb-2">Biit Sports Society</h2>
          <h1 className="text-left font-bold text-lg text-green-700">REGISTER</h1>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />

          <input
            type="text"
            placeholder="ARID Number (20xx-ARID-xxxx)"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={arid}
            onChange={handleAridChange}
            disabled={loading}
            required
          />

          <input
            type="number"
            placeholder="Age"
            min={10}
            max={100}
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={loading}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            disabled={loading}
          >
            <option>Player</option>
            <option>Coach</option>
            <option>Admin</option>
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            disabled={loading}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white py-3 rounded-full font-bold hover:scale-105 transition shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-5 text-sm">
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Already have an account? <b>Login</b>
          </Link>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} BIIT Sports Soiety
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