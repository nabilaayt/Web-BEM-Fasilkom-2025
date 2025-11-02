import express from 'express';
import {
  getPengurusBem,
  getPengurusBemById,
  getPengurusByDinas,
  createPengurusBem,
  updatePengurusBem,
  deletePengurusBem,
} from '../controllers/PengurusBem.js';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/pengurus-bem', getPengurusBem);
router.get('/pengurus-bem/dinas/:dinasId', getPengurusByDinas);
router.get('/pengurus-bem/:id', getPengurusBemById);
router.post('/pengurus-bem', verifyUser, adminOnly, createPengurusBem);
router.patch('/pengurus-bem/:id', verifyUser, adminOnly, updatePengurusBem);
router.delete('/pengurus-bem/:id', verifyUser, adminOnly, deletePengurusBem);

export default router;