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

// Fungsi helper untuk mendapatkan path folder berdasarkan bidang, kategori dinas, dan jabatan
const getFolderPath = async (kategoriDinasId, jabatan) => {
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

  // Struktur folder: ./public/images/{bidang-slug}/{kategori-dinas-slug}/{jabatan}/
  const folderPath = `./public/images/${bidangSlug}/${kategoriDinasSlug}/${jabatanLower}`;
  
  return { folderPath, bidangSlug, kategoriDinasSlug, jabatanLower };
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
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const safeName = path.basename(file.name, ext)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

  const fileName = `${safeName}${ext}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Format gambar tidak valid" });
  }

  if (fileSize > 10485760) {
    return res
      .status(422)
      .json({ msg: "Ukuran gambar harus kurang dari 10 MB" });
  }

  try {
    // Dapatkan path folder berdasarkan bidang, kategori dinas, dan jabatan
    const { folderPath, bidangSlug, kategoriDinasSlug, jabatanLower } = await getFolderPath(
      kategoriDinasId,
      jabatan
    );

    // Buat folder jika belum ada
    ensureDirectoryExists(folderPath);

    // Path lengkap file
    const fullPath = `${folderPath}/${fileName}`;
    
    // URL untuk disimpan di database
    const url = `${req.protocol}://${req.get("host")}/images/${bidangSlug}/${kategoriDinasSlug}/${jabatanLower}/${fileName}`;

    // Upload file
    file.mv(fullPath, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        await PengurusBem.create({
          nama: nama,
          jabatan: jabatan,
          foto: `${bidangSlug}/${kategoriDinasSlug}/${jabatanLower}/${fileName}`, // Simpan path relatif
          url: url,
          kategoriDinasId: kategoriDinasId,
          divisi: divisi,
        });
        res.status(201).json({ msg: "Pengurus BEM berhasil dibuat" });
      } catch (error) {
        // Hapus file jika gagal menyimpan ke database
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
        res.status(400).json({ msg: error.message });
      }
    });
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

    let fileName = pengurus.foto;
    let filePathRelative = pengurus.foto;

    const { nama, jabatan, kategoriDinasId, divisi } = req.body;

    // Jika ada file baru
    if (req.files && req.files.foto) {
      const file = req.files.foto;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const safeName = path.basename(file.name, ext)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");

      const newFileName = `${safeName}${ext}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Format gambar tidak valid" });
      }

      if (fileSize > 10485760) {
        return res
          .status(422)
          .json({ msg: "Ukuran gambar harus kurang dari 10 MB" });
      }

      // Dapatkan path folder baru berdasarkan bidang, kategori dinas, dan jabatan
      const { folderPath, bidangSlug, kategoriDinasSlug, jabatanLower } = await getFolderPath(
        kategoriDinasId,
        jabatan
      );

      // Buat folder jika belum ada
      ensureDirectoryExists(folderPath);

      // Hapus file lama
      const oldFilePath = `./public/images/${pengurus.foto}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      // Path lengkap file baru
      const newFullPath = `${folderPath}/${newFileName}`;
      filePathRelative = `${bidangSlug}/${kategoriDinasSlug}/${jabatanLower}/${newFileName}`;

      // Upload file baru
      file.mv(newFullPath, (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });

      fileName = newFileName;
    } else {
      // Jika tidak ada file baru, tapi jabatan atau kategori berubah
      // Pindahkan file lama ke folder baru
      const { folderPath, bidangSlug, kategoriDinasSlug, jabatanLower } = await getFolderPath(
        kategoriDinasId,
        jabatan
      );

      const oldFilePath = `./public/images/${pengurus.foto}`;
      const fileNameOnly = path.basename(pengurus.foto);
      const newFullPath = `${folderPath}/${fileNameOnly}`;
      filePathRelative = `${bidangSlug}/${kategoriDinasSlug}/${jabatanLower}/${fileNameOnly}`;

      // Jika folder tujuan berbeda, pindahkan file
      if (oldFilePath !== newFullPath && fs.existsSync(oldFilePath)) {
        ensureDirectoryExists(folderPath);
        fs.renameSync(oldFilePath, newFullPath);
      }
    }

    const url = `${req.protocol}://${req.get("host")}/images/${filePathRelative}`;

    await PengurusBem.update(
      {
        nama: nama,
        jabatan: jabatan,
        foto: filePathRelative,
        url: url,
        kategoriDinasId: kategoriDinasId,
        divisi: divisi,
      },
      {
        where: {
          id: pengurus.id,
        },
      }
    );

    res.status(200).json({ msg: "Pengurus BEM berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePengurusBem = async (req, res) => {
  const pengurus = await PengurusBem.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!pengurus) {
    return res.status(404).json({ msg: "Pengurus tidak ditemukan" });
  }

  try {
    const filepath = `./public/images/${pengurus.foto}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await PengurusBem.destroy({
      where: {
        id: pengurus.id,
      },
    });
    res.status(200).json({ msg: "Pengurus BEM berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};