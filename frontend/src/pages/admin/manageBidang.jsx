import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiFolder } from "react-icons/fi";
import Sidebar from "./sidebar";
import dinasService from "../../services/dinasService";
import toast from "react-hot-toast";

const ManageBidang = () => {
  const [bidang, setBidang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    slug: "",
    nama_bidang: "",
  });

  useEffect(() => {
    fetchBidang();
  }, []);

  const fetchBidang = async () => {
    try {
      const data = await dinasService.getAllBidang();
      setBidang(data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data bidang");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await dinasService.updateBidang(currentId, formData);
        toast.success("Bidang berhasil diupdate");
      } else {
        await dinasService.createBidang(formData);
        toast.success("Bidang berhasil ditambahkan");
      }

      resetForm();
      fetchBidang();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.msg || "Gagal menyimpan bidang";
      toast.error(message);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      slug: item.slug,
      nama_bidang: item.nama_bidang,
    });
    setShowModal(true);
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus bidang "${nama}"?`)) {
      try {
        await dinasService.deleteBidang(id);
        toast.success("Bidang berhasil dihapus");
        fetchBidang();
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus bidang");
      }
    }
  };

  const resetForm = () => {
    setFormData({ slug: "", nama_bidang: "" });
    setEditMode(false);
    setCurrentId(null);
    setShowModal(false);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNamaBidangChange = (e) => {
    const nama = e.target.value;
    setFormData({
      nama_bidang: nama,
      slug: generateSlug(nama),
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kelola Bidang
            </h1>
            <p className="text-gray-600">
              Manage bidang-bidang dalam BEM Fasilkom
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#4a0000] text-white rounded-lg hover:bg-[#4a0000]/90 transition-all duration-300 shadow-lg"
          >
            <FiPlus className="w-5 h-5" />
            <span>Tambah Bidang</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a0000]"></div>
            </div>
          ) : bidang.length === 0 ? (
            <div className="text-center py-20">
              <FiFolder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Belum ada data bidang</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-[#4a0000] hover:text-[#4a0000]/90 font-medium"
              >
                Tambah bidang pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Bidang
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Kategori Dinas
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bidang.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {item.nama_bidang}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {item.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.kategori_dinas?.length || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-[#4a0000] hover:bg-[#4a0000]/90 rounded-lg transition-colors"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(item.id, item.nama_bidang)
                            }
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editMode ? "Edit Bidang" : "Tambah Bidang"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Bidang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama_bidang}
                    onChange={handleNamaBidangChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                    placeholder="Contoh: Bidang Media & Teknologi"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#4a0000] text-white rounded-lg hover:bg-[#4a0000]/90 transition-colors font-semibold"
                  >
                    {editMode ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBidang;
