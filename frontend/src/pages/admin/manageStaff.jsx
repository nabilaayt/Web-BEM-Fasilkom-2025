import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import dinasService from "../../services/dinasService";
import toast from "react-hot-toast";

const ManageStaff = () => {
  const [pengurus, setPengurus] = useState([]);
  const [filteredPengurus, setFilteredPengurus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJabatan, setFilterJabatan] = useState("all");

  useEffect(() => {
    fetchPengurus();
  }, []);

  useEffect(() => {
    // Apply filters directly here to keep dependencies explicit
    let filtered = [...pengurus];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.divisi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by jabatan
    if (filterJabatan !== "all") {
      filtered = filtered.filter((p) => p.jabatan === filterJabatan);
    }

    setFilteredPengurus(filtered);
  }, [searchTerm, filterJabatan, pengurus]);

  const fetchPengurus = async () => {
    try {
      const data = await dinasService.getAllPengurus();
      setPengurus(data);
      setFilteredPengurus(data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data pengurus");
    } finally {
      setLoading(false);
    }
  };

  // filtering logic handled in useEffect above

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${nama}?`)) {
      try {
        await dinasService.deletePengurus(id);
        toast.success("Pengurus berhasil dihapus");
        fetchPengurus();
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus pengurus");
      }
    }
  };

  const jabatanOptions = ["all", "BPH", "BPI", "KoorBid", "Staff"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kelola Pengurus
            </h1>
            <p className="text-gray-600">Manage data pengurus BEM Fasilkom</p>
          </div>
          <Link
            to="/admin/addStaff"
            className="flex items-center gap-2 px-6 py-3 bg-[#4a0000] text-white rounded-lg hover:bg-[#4a0000]/90 transition-all duration-300 shadow-lg"
          >
            <FaPlus className="w-5 h-5" />
            <span>Tambah Pengurus</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama atau divisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
              />
            </div>

            {/* Filter Jabatan */}
            <select
              value={filterJabatan}
              onChange={(e) => setFilterJabatan(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
            >
              <option value="all">Semua Jabatan</option>
              {jabatanOptions.slice(1).map((jabatan) => (
                <option key={jabatan} value={jabatan}>
                  {jabatan}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a0000]"></div>
            </div>
          ) : filteredPengurus.length === 0 ? (
            <div className="text-center py-20">
              <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada data pengurus</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Foto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jabatan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Divisi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dinas
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPengurus.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                          {person.foto ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}/images/${
                                person.foto
                              }`}
                              alt={person.nama}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FaUser className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {person.nama}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            person.jabatan === "BPH"
                              ? "bg-purple-100 text-purple-700"
                              : person.jabatan === "BPI"
                              ? "bg-green-100 text-green-700"
                              : person.jabatan === "KoorBid"
                              ? "bg-amber-800 text-[#4a0000]/90"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {person.jabatan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {person.divisi}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {person.kategori_dinas?.nama_dinas || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/edit-dinas/${person.uuid}`}
                            className="p-2 text-[#4a0000] hover:bg-[#4a0000]/90 rounded-lg transition-colors"
                          >
                            <FaEdit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(person.uuid, person.nama)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && filteredPengurus.length > 0 && (
          <div className="mt-4 text-gray-600 text-sm">
            Menampilkan {filteredPengurus.length} dari {pengurus.length}{" "}
            pengurus
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStaff;
