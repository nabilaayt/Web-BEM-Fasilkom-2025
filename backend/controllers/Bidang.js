import Bidang from '../models/BidangModel.js';
import KategoriDinas from '../models/KategoriDinasModel.js';

export const getBidang = async (req, res) => {
  try {
    const bidang = await Bidang.findAll({
      include: [
        {
          model: KategoriDinas,
          as: 'kategori_dinas',
        },
      ],
    });
    res.status(200).json(bidang);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBidangById = async (req, res) => {
  try {
    const bidang = await Bidang.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: KategoriDinas,
          as: 'kategori_dinas',
        },
      ],
    });
    if (!bidang) {
      return res.status(404).json({ msg: 'Bidang tidak ditemukan' });
    }
    res.status(200).json(bidang);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBidangBySlug = async (req, res) => {
  try {
    const bidang = await Bidang.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [
        {
          model: KategoriDinas,
          as: 'kategori_dinas',
        },
      ],
    });
    if (!bidang) {
      return res.status(404).json({ msg: 'Bidang tidak ditemukan' });
    }
    res.status(200).json(bidang);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBidang = async (req, res) => {
  const { slug, nama_bidang } = req.body;

  try {
    await Bidang.create({
      slug: slug,
      nama_bidang: nama_bidang,
    });
    res.status(201).json({ msg: 'Bidang berhasil dibuat' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateBidang = async (req, res) => {
  const bidang = await Bidang.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!bidang) {
    return res.status(404).json({ msg: 'Bidang tidak ditemukan' });
  }

  const { slug, nama_bidang } = req.body;

  try {
    await Bidang.update(
      {
        slug: slug,
        nama_bidang: nama_bidang,
      },
      {
        where: {
          id: bidang.id,
        },
      }
    );
    res.status(200).json({ msg: 'Bidang berhasil diupdate' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteBidang = async (req, res) => {
  const bidang = await Bidang.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!bidang) {
    return res.status(404).json({ msg: 'Bidang tidak ditemukan' });
  }

  try {
    await Bidang.destroy({
      where: {
        id: bidang.id,
      },
    });
    res.status(200).json({ msg: 'Bidang berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};