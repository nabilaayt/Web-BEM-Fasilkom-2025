import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import dinasService from "../../services/dinasService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPengurus: 0,
    bph: 0,
    bpi: 0,
    staff: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await dinasService.getAllPengurus();
      const bph = data.filter((p) => p.jabatan === "BPH").length;
      const bpi = data.filter((p) => p.jabatan === "BPI").length;
      const staff = data.filter((p) => p.jabatan === "Staff").length;

      setStats({
        totalPengurus: data.length,
        bph,
        bpi,
        staff,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Pengurus",
      value: stats.totalPengurus,
      icon: UserGroupIcon,
      color: "from-[#4a0000]/90 to-[#4a0000]",
      iconBg: "bg-amber-800",
      iconColor: "text-[#4a0000]",
    },
    {
      title: "BPH",
      value: stats.bph,
      icon: CheckCircleIcon,
      color: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "BPI",
      value: stats.bpi,
      icon: BriefcaseIcon,
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Staff",
      value: stats.staff,
      icon: ChartBarIcon,
      color: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Selamat datang di Admin Panel BEM Fasilkom UNSRI
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a0000]"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/admin/manage-staff"
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-[#4a0000]/90 to-[#4a0000] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <UserGroupIcon className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">Kelola Pengurus</h3>
                    <p className="text-amber-800 text-sm">
                      Tambah, edit, atau hapus data pengurus
                    </p>
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <ChartBarIcon className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">Lihat Profil Public</h3>
                    <p className="text-purple-100 text-sm">
                      Cek tampilan profil pengurus di website
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
