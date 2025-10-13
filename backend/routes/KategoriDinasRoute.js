import express from 'express';
import {
  getKategoriDinas,
  getKategoriDinasById,
  getKategoriDinasBySlug,
  createKategoriDinas,
  updateKategoriDinas,
  deleteKategoriDinas,
} from '../controllers/KategoriDinas.js';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/kategori-dinas', getKategoriDinas);
router.get('/kategori-dinas/:id', getKategoriDinasById);
router.get('/kategori-dinas/slug/:slug', getKategoriDinasBySlug);
router.post('/kategori-dinas', verifyUser, adminOnly, createKategoriDinas);
router.patch('/kategori-dinas/:id', verifyUser, adminOnly, updateKategoriDinas);
router.delete('/kategori-dinas/:id', verifyUser, adminOnly, deleteKategoriDinas);

export default router;