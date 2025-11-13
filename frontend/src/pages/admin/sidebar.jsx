import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard, // Material Design Icons
  MdPeople,
  MdLogout,
  MdHome,
  MdFolder,
  MdLayers,
} from "react-icons/md";
import { useAuth } from "../../utils/authContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: "/admin", icon: MdDashboard, label: "Dashboard" },
    { path: "/admin/addStaff", icon: MdPeople, label: "Tambah Pengurus" },
    { path: "/admin/manage-staff", icon: MdPeople, label: "Kelola Pengurus" },
    { path: "/admin/manage-bidang", icon: MdFolder, label: "Kelola Bidang" },
    {
      path: "/admin/manage-kategori-dinas",
      icon: MdLayers,
      label: "Kelola Kategori Dinas",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4a0000] to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">BEM</span>
          </div>
          <div>
            <div className="font-bold">Admin Panel</div>
            <div className="text-xs text-gray-400">Artha Darma 2025</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-800">
        <div className="text-sm text-gray-400 mb-1">Logged in as</div>
        <div className="font-semibold">{user?.name}</div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-[#4a0000] text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all duration-300"
        >
          <MdHome className="w-5 h-5" />
          <span>Ke Beranda</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all duration-300"
        >
          <MdLogout className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
