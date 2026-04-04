export default function Footer() {
  return (
    <footer className="mt-24 relative z-10">

      {/* Glass CTA Section */}
      <div className="mx-6 md:mx-20 mb-10 backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl shadow-xl text-center px-6 py-12">

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">
          Ready to dominate the field? 🏟️
        </h2>

        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Join BIIT’s sports community today. Track your stats, compete in tournaments, and showcase your skills!
        </p>

        <a
          href="/register"
          className="inline-block bg-gradient-to-r from-[#43A047] to-[#1B5E20] text-white px-12 py-4 rounded-full font-bold hover:scale-105 transition shadow-lg"
        >
          Join Now
        </a>
      </div>

      {/* Bottom Footer */}
      <div className="backdrop-blur-md bg-white/20 border-t border-white/30 text-center py-4 text-gray-600">
        © {new Date().getFullYear()} BIIT Sports Society. All rights reserved.
      </div>

    </footer>
  );
}