import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isLoggedIn);

  const getStarted = () => {
    if (auth) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="bg-blue-900/50 rounded-2xl shadow-xl p-8 max-w-6xl mx-auto my-10 text-blue-950">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="font-['Unna'] text-6xl font-bold tracking-tight text-blue-950">
          ResuCraft
        </h1>
        <p className="mt-4 text-xl text-blue-900 font-['Unna']">
          Beat the ATS. Impress recruiters. Own your career.
        </p>
      </header>

      {/* Features Section */}
      <section className="space-y-10">
        <h2 className="font-['Unna'] text-4xl font-semibold text-center mb-6 text-blue-900">
          🚀 What ResuCraft Does ?
        </h2>
        <ul className="space-y-6">
          <li className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="font-['Unna'] text-2xl font-bold mb-2 text-blue-900">
              ⚡ Upload & Analyze in Seconds
            </h3>
            <p className="text-base text-blue-800 font-sans">
              Upload your resume instantly and let AI do the analysis in
              seconds. Store multiple resumes in your personal library, switch
              between them effortlessly, and perform targeted analysis on each
              one whenever you need.
            </p>
          </li>

          <li className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="font-['Unna'] text-2xl font-bold mb-2 text-blue-900">
              🔍 Job-Aware Resume Analysis
            </h3>
            <p className="text-base text-blue-800 font-sans">
              Paste any job description and ResuCraft will show how well your
              resume aligns with the role — instantly.
            </p>
          </li>

          <li className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="font-['Unna'] text-2xl font-bold mb-2 text-blue-900">
              📊 ATS Score Breakdown
            </h3>
            <p className="text-base text-blue-800 font-sans">
              Get a clear ATS score out of 100, showing how your resume performs
              against automated screening systems.
            </p>
          </li>

          <li className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="font-['Unna'] text-2xl font-bold mb-2 text-blue-900">
              🧩 Keyword Matching & Suggestions
            </h3>
            <p className="text-base text-blue-800 font-sans">
              View matched and missing keywords. Get actionable suggestions to
              improve your resume’s relevance and impact.
            </p>
          </li>

          <li className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="font-['Unna'] text-2xl font-bold mb-2 text-blue-900">
              ✨ Updated Resume with Improvements
            </h3>
            <p className="text-base text-blue-800 font-sans">
              Receive an updated resume with all suggestions and improvements
              applied — missing keywords added, content refined. Use it directly
              or as a reference to guide your own edits.
            </p>
          </li>

          <li className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <h3 className="font-['Unna'] text-2xl font-bold mb-2 text-blue-900">
              📚 Analysis Archive
            </h3>
            <p className="text-base text-blue-800 font-sans">
              Every analysis is saved. Revisit past roles, compare performance,
              and track your resume’s evolution.
            </p>
          </li>
        </ul>
      </section>

      {/* Why Users Love Section */}
      <section className="mt-16">
        <h2 className="font-['Unna'] text-4xl font-semibold text-center mb-6 text-blue-900">
          ✨ Why Users Love ResuCraft ?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Fast, intuitive interface with a calming bluish theme",
            "Accessible design that respects emotional tone and clarity",
            "No fluff, just results — every insight is actionable",
            "Built for iteration — refine, reanalyze, and improve with ease",
          ].map((text, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow hover:shadow-md transition text-blue-800 text-base font-sans"
            >
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <footer className="text-center mt-20">
        <h2 className="font-['Unna'] text-3xl font-bold mb-4 text-blue-900">
          💼 Ready to craft your winning resume ?
        </h2>
        <p className="text-white/90 mb-6 text-base font-sans">
          Start by uploading your resume and running your first analysis.
        </p>
        <button
          onClick={getStarted}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition font-sans"
        >
          Get Started
        </button>
      </footer>
    </div>
  );
}

export default Home;
