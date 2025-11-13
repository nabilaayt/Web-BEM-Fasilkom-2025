import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogin, MdLock, MdEmail } from "react-icons/md";
import { useAuth } from "../utils/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate("/admin");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4a0000] via-[#3e0c0c] to-[#330b0b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block w-20 h-20 bg-white rounded-2xl items-center justify-center shadow-2xl mb-4">
            <span className="text-3xl font-bold text-[#4a0000]">BEM</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-white">BEM Fasilkom UNSRI - Artha Darma</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#4a0000] hover:bg-[#4a0000]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-950 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <MdLogin className="w-5 h-5" />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white hover:text-amber-900 transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
