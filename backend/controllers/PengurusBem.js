import PengurusBem from "../models/PengurusBemModel.js";
import KategoriDinas from "../models/KategoriDinasModel.js";
import Bidang from "../models/BidangModel.js";
import path from "path";
import fs from "fs";

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
    .replace(/\s+/g, "-")       // ganti spasi dengan tanda "-"
    .replace(/[^a-z0-9-_]/g, ""); // hapus karakter aneh

  const fileName = `${safeName}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Format gambar tidak valid" });
  }

  if (fileSize > 10485760) {
    return res
      .status(422)
      .json({ msg: "Ukuran gambar harus kurang atau lebih dari 10 MB" });
  }

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    try {
      await PengurusBem.create({
        nama: nama,
        jabatan: jabatan,
        foto: fileName,
        url: url,
        kategoriDinasId: kategoriDinasId,
        divisi: divisi,
      });
      res.status(201).json({ msg: "Pengurus BEM berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updatePengurusBem = async (req, res) => {
  const pengurus = await PengurusBem.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!pengurus) {
    return res.status(404).json({ msg: "Pengurus tidak ditemukan" });
  }

  let fileName = pengurus.foto;

  if (req.files && req.files.foto) {
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Format gambar tidak valid" });
    }

    if (fileSize > 5000000) {
      return res
        .status(422)
        .json({ msg: "Ukuran gambar harus kurang dari 5 MB" });
    }

    const filepath = `./public/images/${pengurus.foto}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
    });
  }

  const { nama, jabatan, kategoriDinasId, divisi } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await PengurusBem.update(
      {
        nama: nama,
        jabatan: jabatan,
        foto: fileName,
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
