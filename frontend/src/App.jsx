import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/authContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Homepage from "./pages/Homepage";
import About from "./pages/AboutUspage";
import Login from "./pages/Login";

import Navbar from "./components/N_F/Navbar/Navbar";
import Footer from "./components/N_F/Footer/Footer";

import Dashboard from "./pages/admin/dashboard";
import ManageStaff from "./pages/admin/manageStaff";
import AddDinas from "./pages/admin/addStaff";
import EditDinas from "./pages/admin/edit";
import ManageBidang from "./pages/admin/manageBidang";
import ManageKategoriDinas from "./pages/admin/manageKategoriDinas";

// Layout Wrapper for Public Pages
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Homepage />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-staff"
          element={
            <ProtectedRoute>
              <ManageStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/addStaff"
          element={
            <ProtectedRoute>
              <AddDinas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-dinas/:id"
          element={
            <ProtectedRoute>
              <EditDinas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-bidang"
          element={
            <ProtectedRoute>
              <ManageBidang />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-kategori-dinas"
          element={
            <ProtectedRoute>
              <ManageKategoriDinas />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Halaman tidak ditemukan
                  </p>
                  <a
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    Kembali ke Beranda
                  </a>
                </div>
              </div>
            </PublicLayout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
