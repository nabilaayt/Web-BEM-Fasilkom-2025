import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";
import Sidebar from "./sidebar";
import dinasService from "../../services/dinasService";
import toast from "react-hot-toast";

const EditDinas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [kategoriDinas, setKategoriDinas] = useState([]);
  const [preview, setPreview] = useState(null);
  const [currentFoto, setCurrentFoto] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    divisi: "",
    kategoriDinasId: "",
    foto: null,
  });

  useEffect(() => {
    fetchKategoriDinas();
    fetchPengurusData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchKategoriDinas = async () => {
    try {
      const data = await dinasService.getAllKategoriDinas();
      setKategoriDinas(data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat kategori dinas");
    }
  };

  const fetchPengurusData = async () => {
    try {
      const data = await dinasService.getPengurusById(id);
      setFormData({
        nama: data.nama,
        jabatan: data.jabatan,
        divisi: data.divisi,
        kategoriDinasId: data.kategoriDinasId,
        foto: null,
      });
      setCurrentFoto(data.foto);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data pengurus");
      navigate("/admin/manage-staff");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Format file harus PNG, JPG, atau JPEG");
        return;
      }

      if (file.size > 5000000) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        foto: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      foto: null,
    }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("nama", formData.nama);
      data.append("jabatan", formData.jabatan);
      data.append("divisi", formData.divisi);
      data.append("kategoriDinasId", formData.kategoriDinasId);

      if (formData.foto) {
        data.append("foto", formData.foto);
      }

      await dinasService.updatePengurus(id, data);
      toast.success("Pengurus berhasil diupdate");
      navigate("/admin/manage-staff");
    } catch (error) {
      const message = error.response?.data?.msg || "Gagal mengupdate pengurus";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/manage-staff")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Pengurus
          </h1>
          <p className="text-gray-600">Update data pengurus BEM Fasilkom</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Jabatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <select
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                required
              >
                <option value="Staff">Staff</option>
                <option value="KoorBid">Koordinator Bidang</option>
                <option value="BPI">BPI</option>
                <option value="BPH">BPH</option>
              </select>
            </div>

            {/* Divisi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Divisi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="divisi"
                value={formData.divisi}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                placeholder="Contoh: Divisi Media & Informasi"
                required
              />
            </div>

            {/* Kategori Dinas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori Dinas <span className="text-red-500">*</span>
              </label>
              <select
                name="kategoriDinasId"
                value={formData.kategoriDinasId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a0000] focus:border-transparent"
                required
              >
                <option value="">Pilih Kategori Dinas</option>
                {kategoriDinas.map((dinas) => (
                  <option key={dinas.id} value={dinas.id}>
                    {dinas.nama_dinas}
                  </option>
                ))}
              </select>
            </div>

            {/* Foto Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto
              </label>

              {/* Current Photo */}
              {currentFoto && !preview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Foto saat ini:</p>
                  <img
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/images/${currentFoto}`}
                    alt="Current"
                    className="w-64 h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* New Photo Preview */}
              {preview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Foto baru:</p>
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              {!preview && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#4a0000]/90 transition-colors">
                  <input
                    type="file"
                    id="foto"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="foto"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FaUpload className="w-12 h-12 text-gray-400 mb-4" />
                    <span className="text-gray-600 mb-2">
                      Klik untuk upload foto baru
                    </span>
                    <span className="text-sm text-gray-500">
                      PNG, JPG, JPEG (Max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/manage-staff")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#4a0000] text-white rounded-lg hover:bg-[#4a0000]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? "Menyimpan..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDinas;
