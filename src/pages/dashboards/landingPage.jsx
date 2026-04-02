import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden font-sans">

      {/* Background Glows */}
      <div className="absolute w-[500px] h-[500px] bg-green-200 opacity-20 blur-[150px] -top-24 -left-24 animate-pulse-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-lime-200 opacity-20 blur-[150px] -bottom-24 -right-24 animate-pulse-slow"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 relative z-10">
        <h1 className="text-2xl font-bold tracking-wide text-green-600">
          BIIT Sports Society
        </h1>
        <div className="space-x-6">
          <Link to="/login" className="hover:text-green-600 transition font-medium">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-500 transition shadow-md"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-24 px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Elevate Your <span className="text-green-600">Game</span> ⚡
        </h1>
        <p className="text-gray-700 max-w-2xl text-lg mb-10">
          Manage tournaments, track your performance, and connect with players — all in one powerful sports platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-10 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg"
          >
            Get Started 🚀
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 px-10 py-3 rounded-full hover:bg-green-50 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-28 px-10 grid md:grid-cols-3 gap-8 relative z-10">
        {[
          { title: "🏆 Smart Tournaments", desc: "Create, manage, and join tournaments with real-time updates." },
          { title: "📊 Player Analytics", desc: "Track stats, performance trends, and improve your gameplay." },
          { title: "🤝 Community Hub", desc: "Connect with athletes, teams, and sports enthusiasts." },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl border border-gray-100 p-6 rounded-3xl hover:scale-105 transition duration-300"
          >
            <h2 className="text-xl font-bold mb-3 text-green-600">{item.title}</h2>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-32 text-center px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to dominate the field? 🏟️
        </h2>
        <Link
          to="/register"
          className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-12 py-4 rounded-full font-bold hover:scale-105 transition shadow-2xl"
        >
          Join Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-gray-500 pb-6 relative z-10">
        © {new Date().getFullYear()} BIIT Sports Society. All rights reserved.
      </footer>

      {/* Extra Tailwind Animation */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.05); opacity: 0.25; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s infinite;
          }
        `}
      </style>
    </div>
  );
}