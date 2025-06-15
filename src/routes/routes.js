import { Router } from "express";
import contactRoutes from "./contacts.js"
const router = Router();

router.use('/contacts', contactRoutes);

export default router;