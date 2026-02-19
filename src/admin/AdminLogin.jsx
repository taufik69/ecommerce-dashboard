import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    if (
      formData.email === "bdonlineshop268@gmail.com" &&
      formData.password === "BDFurniture@123"
    ) {
      localStorage.setItem(
        "admin",
        JSON.stringify({
          name: "Admin",
          email: formData.email,
          avatar: "/avatars/admin.jpg",
          token: "loggedin",
        }),
      );
      navigate("/home");
    } else {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex"
      style={{
        background: "#08080a",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124,58,237,0.5); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(124,58,237,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124,58,237,0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes loading-bar {
          0%   { width: 0%;   opacity: 1; }
          80%  { width: 90%;  opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }

        .fade-1 { animation: fadeUp 0.6s ease 0.1s both; }
        .fade-2 { animation: fadeUp 0.6s ease 0.2s both; }
        .fade-3 { animation: fadeUp 0.6s ease 0.3s both; }
        .fade-4 { animation: fadeUp 0.6s ease 0.4s both; }
        .fade-5 { animation: fadeUp 0.6s ease 0.5s both; }

        .float-anim { animation: float 5s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd, #7c3aed);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          color: white;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
          outline: none;
          padding: 14px 14px 14px 46px;
        }
        .input-field:focus {
          border-color: rgba(124,58,237,0.6);
          background: rgba(124,58,237,0.05);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
        }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }

        .submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%);
          position: relative;
          overflow: hidden;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124,58,237,0.45);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .submit-btn:hover::before { opacity: 1; }

        .loading-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: rgba(255,255,255,0.6);
          animation: loading-bar 0.9s ease-in-out forwards;
        }

        .shake { animation: shake 0.4s ease; }

        .glass-panel {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        /* Decorative grid lines */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
      `}</style>

      {/* ─── Left Panel (decorative) ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center">
        <div className="grid-overlay" />

        {/* Orbs */}
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            background: "rgba(109,40,217,0.18)",
            top: "10%",
            left: "5%",
          }}
        />
        <div
          className="orb"
          style={{
            width: 300,
            height: 300,
            background: "rgba(167,139,250,0.1)",
            bottom: "15%",
            right: "10%",
          }}
        />

        <div
          className="relative z-10 text-center px-12"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {/* Rotating ring */}
          <div className="relative w-28 h-28 mx-auto mb-10 float-anim">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(124,58,237,0.3)",
                animation: "spin-slow 8s linear infinite",
                backgroundImage:
                  "conic-gradient(from 0deg, transparent 70%, rgba(124,58,237,0.6) 100%)",
              }}
            />
            <div
              className="absolute inset-3 rounded-full"
              style={{
                border: "1px solid rgba(167,139,250,0.2)",
                animation: "spin-slow 6s linear infinite reverse",
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ animation: "pulse-ring 2.5s ease-in-out infinite" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                }}
              >
                <ShieldCheck size={28} color="white" />
              </div>
            </div>
          </div>

          <h2
            className="text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}
          >
            Secure Admin
            <br />
            <span className="shimmer-text">Access Portal</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            Centralized control over products, orders, and categories. Sign in
            to manage your store.
          </p>

          {/* Stats row */}
          <div className="mt-12 flex gap-8 justify-center">
            {[
              { label: "Products", val: "120+" },
              { label: "Orders", val: "350+" },
              { label: "Uptime", val: "99.9%" },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <p
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {val}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-medium uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #08080a, transparent)",
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute top-0 bottom-0 right-0 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #08080a, transparent)",
          }}
        />
      </div>

      {/* ─── Right Panel (form) ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        <div
          className="orb"
          style={{
            width: 400,
            height: 400,
            background: "rgba(109,40,217,0.08)",
            top: "20%",
            right: "10%",
          }}
        />

        <div className="w-full max-w-sm relative z-10">
          {/* Logo mark (mobile only) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              }}
            >
              <ShieldCheck size={24} color="white" />
            </div>
          </div>

          <div className="fade-1">
            <p className="text-xs text-slate-600 font-semibold uppercase tracking-widest mb-2">
              Welcome back
            </p>
            <h1
              className="text-3xl font-extrabold text-white mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Sign in
            </h1>
            <p className="text-sm text-slate-500 mb-8">
              Enter your admin credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="fade-2 relative">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <Mail size={16} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Admin email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="fade-3 relative">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                style={{ paddingRight: "46px" }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{
                  color: showPassword
                    ? "rgba(167,139,250,0.8)"
                    : "rgba(255,255,255,0.2)",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                className="fade-1 shake flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-rose-400"
                style={{
                  background: "rgba(244,63,94,0.08)",
                  border: "1px solid rgba(244,63,94,0.2)",
                }}
              >
                <span className="text-xs">⚠</span> {error}
              </div>
            )}

            {/* Submit */}
            <div className="fade-4 pt-2">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      style={{ animation: "spin-slow 0.7s linear infinite" }}
                    />
                    Verifying…
                    <span className="loading-bar" />
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="fade-5 text-center text-xs text-slate-700 mt-8">
            Protected by admin authentication &nbsp;·&nbsp; BD Online Shop
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
