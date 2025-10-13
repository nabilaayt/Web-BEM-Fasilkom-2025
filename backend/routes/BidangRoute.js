import express from 'express';
import {
  getBidang,
  getBidangById,
  getBidangBySlug,
  createBidang,
  updateBidang,
  deleteBidang,
} from '../controllers/Bidang.js';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/bidang', getBidang);
router.get('/bidang/:id', getBidangById);
router.get('/bidang/slug/:slug', getBidangBySlug);
router.post('/bidang', verifyUser, adminOnly, createBidang);
router.patch('/bidang/:id', verifyUser, adminOnly, updateBidang);
router.delete('/bidang/:id', verifyUser, adminOnly, deleteBidang);

export default router;