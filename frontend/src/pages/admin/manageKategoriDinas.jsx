import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiLayers } from "react-icons/fi";
import Sidebar from "./sidebar";
import dinasService from "../../services/dinasService";
import toast from "react-hot-toast";

const ManageKategoriDinas = () => {
  const [kategoriDinas, setKategoriDinas] = useState([]);
  const [bidang, setBidang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    slug: "",
    nama_dinas: "",
    bidangId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [kategoriData, bidangData] = await Promise.all([
        dinasService.getAllKategoriDinas(),
        dinasService.getAllBidang(),
      ]);
      setKategoriDinas(kategoriData);
      setBidang(bidangData);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await dinasService.updateKategoriDinas(currentId, formData);
        toast.success("Kategori Dinas berhasil diupdate");
      } else {
        await dinasService.createKategoriDinas(formData);
        toast.success("Kategori Dinas berhasil ditambahkan");
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.msg || "Gagal menyimpan kategori dinas";
      toast.error(message);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setCurrentId(item.id);
    setFormData({
      slug: item.slug,
      nama_dinas: item.nama_dinas,
      bidangId: item.bidangId || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id, nama) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus kategori dinas "${nama}"?`
      )
    ) {
      try {
        await dinasService.deleteKategoriDinas(id);
        toast.success("Kategori Dinas berhasil dihapus");
        fetchData();
      } catch (err) {
        console.error(err);
        toast.error("Gagal menghapus kategori dinas");
      }
    }
  };

  const resetForm = () => {
    setFormData({ slug: "", nama_dinas: "", bidangId: "" });
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

  const handleNamaDinasChange = (e) => {
    const nama = e.target.value;
    setFormData({
      ...formData,
      nama_dinas: nama,
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
              Kelola Kategori Dinas
            </h1>
            <p className="text-gray-600">
              Manage kategori dinas dalam BEM Fasilkom
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#4a0000] text-white rounded-lg hover:bg-[#4a0000]/90 transition-all duration-300 shadow-lg"
          >
            <FiPlus className="w-5 h-5" />
            <span>Tambah Kategori Dinas</span>
          </button>
        </div>

        {/* Alert if no bidang */}
        {bidang.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Belum ada bidang. Silakan tambahkan bidang terlebih dahulu di
                  menu <strong>Kelola Bidang</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a0000]"></div>
            </div>
          ) : kategoriDinas.length === 0 ? (
            <div className="text-center py-20">
              <FiLayers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Belum ada data kategori dinas
              </p>
              {bidang.length > 0 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-[#4a0000] hover:text-[#4a0000]/90 font-medium"
                >
                  Tambah kategori dinas pertama
                </button>
              )}
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
                      Nama Dinas
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bidang
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Pengurus
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {kategoriDinas.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {item.nama_dinas}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {item.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        {item.bidang ? (
                          <span className="inline-block px-3 py-1 bg-amber-800 text-[#4a0000]/90 rounded-full text-sm font-medium">
                            {item.bidang.nama_bidang}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            Tidak ada bidang
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.pengurus?.length || 0}
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
                              handleDelete(item.id, item.nama_dinas)
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
                {editMode ? "Edit Kategori Dinas" : "Tambah Kategori Dinas"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Dinas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama_dinas}
                    onChange={handleNamaDinasChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                    placeholder="Contoh: Dinas Medinfo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.bidangId}
                    onChange={(e) =>
                      setFormData({ ...formData, bidangId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Bidang</option>
                    {bidang.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_bidang}
                      </option>
                    ))}
                  </select>
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

export default ManageKategoriDinas;
