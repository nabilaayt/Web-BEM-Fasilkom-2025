import KategoriDinas from '../models/KategoriDinasModel.js';
import Bidang from '../models/BidangModel.js';
import PengurusBem from '../models/PengurusBemModel.js';

export const getKategoriDinas = async (req, res) => {
  try {
    const kategoriDinas = await KategoriDinas.findAll({
      include: [
        {
          model: Bidang,
          as: 'bidang',
        },
        {
          model: PengurusBem,
          as: 'pengurus',
        },
      ],
    });
    res.status(200).json(kategoriDinas);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKategoriDinasById = async (req, res) => {
  try {
    const kategoriDinas = await KategoriDinas.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Bidang,
          as: 'bidang',
        },
        {
          model: PengurusBem,
          as: 'pengurus',
        },
      ],
    });
    if (!kategoriDinas) {
      return res.status(404).json({ msg: 'Kategori Dinas tidak ditemukan' });
    }
    res.status(200).json(kategoriDinas);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKategoriDinasBySlug = async (req, res) => {
  try {
    const kategoriDinas = await KategoriDinas.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [
        {
          model: Bidang,
          as: 'bidang',
        },
        {
          model: PengurusBem,
          as: 'pengurus',
        },
      ],
    });
    if (!kategoriDinas) {
      return res.status(404).json({ msg: 'Kategori Dinas tidak ditemukan' });
    }
    res.status(200).json(kategoriDinas);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKategoriDinas = async (req, res) => {
  const { slug, nama_dinas, bidangId } = req.body;

  try {
    await KategoriDinas.create({
      slug: slug,
      nama_dinas: nama_dinas,
      bidangId: bidangId,
    });
    res.status(201).json({ msg: 'Kategori Dinas berhasil dibuat' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateKategoriDinas = async (req, res) => {
  const kategoriDinas = await KategoriDinas.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kategoriDinas) {
    return res.status(404).json({ msg: 'Kategori Dinas tidak ditemukan' });
  }

  const { slug, nama_dinas, bidangId } = req.body;

  try {
    await KategoriDinas.update(
      {
        slug: slug,
        nama_dinas: nama_dinas,
        bidangId: bidangId,
      },
      {
        where: {
          id: kategoriDinas.id,
        },
      }
    );
    res.status(200).json({ msg: 'Kategori Dinas berhasil diupdate' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteKategoriDinas = async (req, res) => {
  const kategoriDinas = await KategoriDinas.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kategoriDinas) {
    return res.status(404).json({ msg: 'Kategori Dinas tidak ditemukan' });
  }

  try {
    await KategoriDinas.destroy({
      where: {
        id: kategoriDinas.id,
      },
    });
    res.status(200).json({ msg: 'Kategori Dinas berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};