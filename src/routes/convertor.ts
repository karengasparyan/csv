import {Router} from "express";
import Convertors from '../controllers/Convertors';
import multer from "multer";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('file'), Convertors.jsonToCsv);

export default router;