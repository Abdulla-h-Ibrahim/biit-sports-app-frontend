import { Link } from "react-router-dom";
import { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


export default function LandingPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const pastEvents = [
    { name: "Inter Dept Cricket Final", time: "10 Jan 10 AM", venue: "Ground A", desc: "Final match between CS vs SE" },
    { name: "Football Tournament", time: "5 Jan 12 PM", venue: "Field B", desc: "League stage matches" },
  ];

  const ongoingEvents = [
    { name: "Cricket Match", time: "Today 10 AM - 4 PM", venue: "Ground A", desc: "Live quarter-final match" },
    { name: "Football League", time: "Today 12 PM - 6 PM", venue: "Field B", desc: "Group stage matches ongoing" },
  ];

  const upcomingEvents = [
    { name: "Basketball Tournament", time: "20 April 2026", venue: "Court A", desc: "Knockout stage begins" },
    { name: "Athletics Meet", time: "25 April 2026", venue: "Track Ground", desc: "Annual sports day events" },
  ];

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

      {/* Events Split Section */}
      <section className="mt-28 px-6 relative z-10">

        <h2 className="text-3xl font-bold text-center mb-10 text-[#2E7D32]">
          📊 Events Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ⬅️ Past Events */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-300 p-4">
            <h3 className="text-lg font-bold text-center py-2 mb-4 bg-gray-100 text-gray-700 rounded-xl">
              🏁 Past Events
            </h3>

            <iframe
              src="https://calendar.google.com/calendar/embed?src=PAST_CALENDAR_ID&ctz=Asia%2FKarachi"
              width="100%"
              height="400"
              style={{ border: 0 }}
              title="Past Events"
            ></iframe>
          </div>

          {/* 🔥 Ongoing Events (UNCHANGED) */}
          <div className="bg-white rounded-3xl shadow-xl border border-green-300 p-4">
            <h3 className="flex items-center justify-between text-lg font-bold py-2 mb-4 bg-green-100 text-[#2E7D32] rounded-xl px-4">
              <span>🔥 Ongoing Events</span>

              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                LIVE
              </span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr
                    className="border-b hover:bg-green-50 cursor-pointer"
                  >                    <th className="py-2">Event</th>
                    <th className="py-2">Time</th>
                    <th className="py-2">Venue</th>
                  </tr>
                </thead>

                <tbody>
                  {ongoingEvents.map((event, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedEvent(event)}
                      className="border-b hover:bg-green-50 cursor-pointer"
                    >
                      <td className="py-2">{event.name}</td>
                      <td>{event.time}</td>
                      <td>{event.venue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ➡️ Upcoming Events */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-300 p-4">
            <h3 className="text-lg font-bold text-center py-2 mb-4 bg-gray-100 text--700 rounded-xl">
              🚀 Upcoming Events
            </h3>

            <iframe
              src="https://calendar.google.com/calendar/embed?src=UPCOMING_CALENDAR_ID&ctz=Asia%2FKarachi"
              width="100%"
              height="400"
              style={{ border: 0 }}
              title="Upcoming Events"
            ></iframe>
          </div>

        </div>
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-2xl relative">

            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-4 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">
              {selectedEvent.name}
            </h2>

            <p className="mb-2"><strong>⏰ Time:</strong> {selectedEvent.time}</p>
            <p className="mb-2"><strong>📍 Venue:</strong> {selectedEvent.venue}</p>

            {/* Optional */}
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">
              View More Details
            </button>

          </div>
        </div>
      )}
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