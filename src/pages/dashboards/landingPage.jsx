import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-[#0B3D0B] bg-white">

      {/* Background Circles + Corner Gradients */}
      <div className="absolute inset-0 z-0">
        {/* Corner Gradients */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#66BB6A] to-transparent opacity-20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#43A047] to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#2E7D32] to-transparent opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#1B5E20] to-transparent opacity-20"></div>

        {/* Large Floating Green Circles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${400 + i * 200}px`,
              height: `${400 + i * 200}px`,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 60}%`,
              background: `radial-gradient(circle, ${['#1B5E20', '#2E7D32', '#43A047'][i]} 0%, transparent 70%)`,
              animation: `float${i} ${20 + i * 5}s ease-in-out infinite alternate`
            }}
          ></div>
        ))}
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-24 px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          Level Up Your <span className="text-[#43A047]">Game</span> ⚡
        </h1>
        <p className="text-gray-700 max-w-2xl text-lg mb-10 drop-shadow-md">
          The ultimate hub for BIIT athletes — register for tournaments, track your performance, and connect with the campus sports community.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-[#43A047] to-[#1B5E20] text-white px-10 py-3 rounded-full font-bold hover:scale-105 transition shadow-xl"
          >
            Get Started 🚀
          </Link>
          <Link
            to="/login"
            className="border border-[#43A047] px-10 py-3 rounded-full hover:bg-[#43A047] hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-28 px-10 grid md:grid-cols-3 gap-8 relative z-10">
        {[
          { title: "🏆 Smart Tournaments", desc: "Join or organize tournaments with live updates and rankings." },
          { title: "📊 Player Analytics", desc: "Track performance, view trends, and improve your game." },
          { title: "🤝 Community Hub", desc: "Connect with fellow athletes and form teams easily." },
          { title: "🎯 Goals & Achievements", desc: "Set personal targets and showcase your progress." },
          { title: "📅 Event Calendar", desc: "Never miss a match with our intuitive calendar." },
          { title: "💬 Chat & Collaborate", desc: "Communicate seamlessly with teammates and coaches." },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-green-50 bg-opacity-30 backdrop-blur-md shadow-lg border border-green-200 p-6 rounded-3xl hover:scale-105 transition duration-300"
          >
            <h2 className="text-xl font-bold mb-3 text-[#2E7D32]">{item.title}</h2>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      <Footer />

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes float0 { 0% { transform: translateY(0); } 100% { transform: translateY(-20px); } }
          @keyframes float1 { 0% { transform: translateY(0); } 100% { transform: translateY(-25px); } }
          @keyframes float2 { 0% { transform: translateY(0); } 100% { transform: translateY(-30px); } }
        `}
      </style>
    </div>
  );
}