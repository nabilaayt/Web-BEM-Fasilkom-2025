import express from 'express';
import { Login, Logout, Me } from '../controllers/Auth.js';

const router = express.Router();
console.log("✅ AuthRoute loaded");
router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;