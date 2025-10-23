import PengurusBem from "../models/PengurusBemModel.js";
import KategoriDinas from "../models/KategoriDinasModel.js";
import Bidang from "../models/BidangModel.js";
import path from "path";
import fs from "fs";

// Fungsi helper untuk membuat folder jika belum ada
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Fungsi untuk validasi file
const validateFile = (file) => {
  const fileSize = file.data.length;
  const ext = path.extname(file.name).toLowerCase();
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext)) {
    return { error: "Format gambar tidak valid" };
  }

  if (fileSize > 10485760) { // 10MB
    return { error: "Ukuran gambar harus kurang dari 10 MB" };
  }

  return { error: null };
};

// Fungsi untuk mempersiapkan nama file
const prepareFileName = (file) => {
  const ext = path.extname(file.name);
  const safeName = path.basename(file.name, ext)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
  return `${safeName}${ext}`;
};

// Fungsi untuk normalisasi dan validasi path folder
const validateAndNormalizePath = async (kategoriDinasId, jabatan) => {
  // Untuk BPI, gunakan folder khusus
  if (jabatan === "BPI") {
    return {
      folderPath: "./public/images/BPI",
      pathSegments: ["BPI"],
      jabatanLower: "bpi"
    };
  }

  // Ambil data kategori dinas beserta bidang
  const kategoriDinas = await KategoriDinas.findOne({
    where: { id: kategoriDinasId },
    include: [{ model: Bidang, as: "bidang" }]
  });

  if (!kategoriDinas || !kategoriDinas.bidang) {
    throw new Error("Bidang atau Kategori Dinas tidak ditemukan");
  }

  const bidangSlug = kategoriDinas.bidang.slug;
  const kategoriDinasSlug = kategoriDinas.slug;
  const jabatanLower = jabatan.toLowerCase();

  // Normalisasi nama folder sesuai struktur yang ada
  const folderMap = {
    'kerumahtanggaan': 'kerumah-tanggaan',
    'media-teknologi': 'media-teknologi',
    'sosial-politik': 'sosial-politik',
    'minbat': 'minbat',
    'relasi': 'relasi',
    'inti': 'BPI'  // Khusus untuk Badan Pengurus Inti
  };

  const normalizedBidangSlug = folderMap[bidangSlug] || bidangSlug;
  
  // Struktur folder: ./public/images/{bidang-slug}/{kategori-dinas-slug}/{jabatan}/
  const folderPath = `./public/images/${normalizedBidangSlug}/${kategoriDinasSlug}/${jabatanLower}`;
  const pathSegments = [normalizedBidangSlug, kategoriDinasSlug, jabatanLower];

  return { folderPath, pathSegments, jabatanLower };
};

export const getPengurusBem = async (req, res) => {
  try {
    const pengurus = await PengurusBem.findAll({
      include: [
        {
          model: KategoriDinas,
          as: "kategori_dinas",
          include: [
            {
              model: Bidang,
              as: "bidang",
            },
          ],
        },
      ],
    });
    res.status(200).json(pengurus);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPengurusBemById = async (req, res) => {
  try {
    const pengurus = await PengurusBem.findOne({
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: KategoriDinas,
          as: "kategori_dinas",
          include: [
            {
              model: Bidang,
              as: "bidang",
            },
          ],
        },
      ],
    });
    if (!pengurus) {
      return res.status(404).json({ msg: "Pengurus tidak ditemukan" });
    }
    res.status(200).json(pengurus);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPengurusBem = async (req, res) => {
  if (!req.files || !req.files.foto) {
    return res.status(400).json({ msg: "Tidak ada file yang diupload" });
  }

  const { nama, jabatan, kategoriDinasId, divisi } = req.body;
  const file = req.files.foto;

  try {
    // Validasi file
    const validationResult = validateFile(file);
    if (validationResult.error) {
      return res.status(422).json({ msg: validationResult.error });
    }

    // Get normalized path
    const { folderPath, pathSegments, jabatanLower } = await validateAndNormalizePath(
      kategoriDinasId,
      jabatan
    );

    // Prepare filename
    const fileName = prepareFileName(file);
    
    // Ensure directory exists
    ensureDirectoryExists(folderPath);

    // Full path for file
    const fullPath = `${folderPath}/${fileName}`;
    
    // URL for database
    const relativeFilePath = [...pathSegments, fileName].join('/');
    const url = `${req.protocol}://${req.get("host")}/images/${relativeFilePath}`;

    // Move uploaded file
    try {
      await file.mv(fullPath);
    } catch (err) {
      return res.status(500).json({ msg: "Gagal mengupload file: " + err.message });
    }

    try {
      const pengurus = await PengurusBem.create({
        nama,
        jabatan,
        foto: relativeFilePath,
        url,
        kategoriDinasId,
        divisi
      });

      res.status(201).json({ 
        msg: "Pengurus BEM berhasil dibuat",
        data: {
          id: pengurus.id,
          nama,
          jabatan,
          foto: relativeFilePath,
          url
        }
      });
    } catch (error) {
      // Hapus file jika gagal menyimpan ke database
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      throw error;
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePengurusBem = async (req, res) => {
  try {
    const pengurus = await PengurusBem.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pengurus) {
      return res.status(404).json({ msg: "Pengurus tidak ditemukan" });
    }

    const { nama, jabatan, kategoriDinasId, divisi } = req.body;

    // Get new normalized path
    const { folderPath, pathSegments } = await validateAndNormalizePath(
      kategoriDinasId,
      jabatan
    );

    let relativeFilePath = pengurus.foto;
    let newFullPath;

    // Handle file update if new file is uploaded
    if (req.files && req.files.foto) {
      const file = req.files.foto;
      
      // Validate new file
      const validationResult = validateFile(file);
      if (validationResult.error) {
        return res.status(422).json({ msg: validationResult.error });
      }

      // Prepare new filename and paths
      const newFileName = prepareFileName(file);
      relativeFilePath = [...pathSegments, newFileName].join('/');
      newFullPath = `${folderPath}/${newFileName}`;

      // Ensure new directory exists
      ensureDirectoryExists(folderPath);

      try {
        // Delete old file
        const oldFilePath = `./public/images/${pengurus.foto}`;
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }

        // Upload new file
        await file.mv(newFullPath);
      } catch (err) {
        return res.status(500).json({ msg: "Gagal memperbarui file: " + err.message });
      }
    } else if (kategoriDinasId !== pengurus.kategoriDinasId || jabatan !== pengurus.jabatan) {
      // If no new file but position changed, move existing file to new location
      const oldFilePath = `./public/images/${pengurus.foto}`;
      const fileNameOnly = path.basename(pengurus.foto);
      newFullPath = `${folderPath}/${fileNameOnly}`;
      relativeFilePath = [...pathSegments, fileNameOnly].join('/');

      // Move file if paths are different
      if (oldFilePath !== newFullPath && fs.existsSync(oldFilePath)) {
        ensureDirectoryExists(folderPath);
        fs.renameSync(oldFilePath, newFullPath);
      }
    }

    const url = `${req.protocol}://${req.get("host")}/images/${relativeFilePath}`;

    const updatedPengurus = await PengurusBem.update(
      {
        nama,
        jabatan,
        foto: relativeFilePath,
        url,
        kategoriDinasId,
        divisi,
      },
      {
        where: {
          id: pengurus.id,
        },
        returning: true,
      }
    );

    res.status(200).json({ 
      msg: "Pengurus BEM berhasil diupdate",
      data: {
        id: pengurus.id,
        nama,
        jabatan,
        foto: relativeFilePath,
        url
      }
    });
  } catch (error) {
    // If file was moved/created but database update failed, try to restore old state
    if (newFullPath && fs.existsSync(newFullPath)) {
      try {
        const oldPath = `./public/images/${pengurus.foto}`;
        if (!fs.existsSync(oldPath)) {
          fs.renameSync(newFullPath, oldPath);
        } else {
          fs.unlinkSync(newFullPath);
        }
      } catch (cleanupError) {
        console.error("Gagal membersihkan file setelah error:", cleanupError);
      }
    }
    res.status(400).json({ msg: error.message });
  }
};

// Helper untuk menghapus folder kosong secara rekursif
const removeEmptyFolders = (folderPath) => {
  if (!fs.existsSync(folderPath)) return;

  // Baca isi folder
  let files = fs.readdirSync(folderPath);

  // Cek folder secara rekursif
  files.forEach(file => {
    const fullPath = path.join(folderPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeEmptyFolders(fullPath);
    }
  });

  // Baca ulang folder setelah pembersihan subfolder
  files = fs.readdirSync(folderPath);

  // Jika folder kosong, hapus
  if (files.length === 0) {
    fs.rmdirSync(folderPath);
  }
};

export const getPengurusByDinas = async (req, res) => {
  try {
    const kategoriDinasId = req.params.dinasId;

    // Validasi kategori dinas exists
    const kategoriDinas = await KategoriDinas.findOne({
      where: { id: kategoriDinasId },
      include: [{ model: Bidang, as: "bidang" }],
    });

    if (!kategoriDinas) {
      return res.status(404).json({ msg: "Dinas tidak ditemukan" });
    }

    // Ambil semua pengurus untuk dinas tersebut
    const pengurus = await PengurusBem.findAll({
      where: {
        kategoriDinasId: kategoriDinasId,
      },
      order: [
        ['jabatan', 'ASC'], // BPH akan muncul duluan
        ['divisi', 'ASC'],  // Urutkan per divisi
        ['nama', 'ASC'],    // Urutkan per nama
      ],
      include: [
        {
          model: KategoriDinas,
          as: "kategori_dinas",
          include: [
            {
              model: Bidang,
              as: "bidang",
            },
          ],
        },
      ],
    });

    // Transform data sebelum kirim ke client
    const transformedPengurus = pengurus.map(p => ({
      uuid: p.uuid,
      nama: p.nama,
      jabatan: p.jabatan,
      divisi: p.divisi,
      foto: p.foto,
      url: `${req.protocol}://${req.get("host")}/images/${p.foto}`,
      dinasInfo: {
        nama: p.kategori_dinas.nama_dinas,
        bidang: p.kategori_dinas.bidang.nama_bidang,
      }
    }));

    res.status(200).json(transformedPengurus);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePengurusBem = async (req, res) => {
  try {
    const pengurus = await PengurusBem.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pengurus) {
      return res.status(404).json({ msg: "Pengurus tidak ditemukan" });
    }

    // Hapus file foto
    const filepath = `./public/images/${pengurus.foto}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    // Hapus data dari database
    await PengurusBem.destroy({
      where: {
        id: pengurus.id,
      },
    });

    // Bersihkan folder kosong
    const folderPath = path.dirname(filepath);
    removeEmptyFolders(folderPath);

    res.status(200).json({ 
      msg: "Pengurus BEM berhasil dihapus",
      data: {
        id: pengurus.id,
        nama: pengurus.nama,
        deletedFile: pengurus.foto
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};