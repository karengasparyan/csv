import {Router} from 'express';
import convertor from './convertor'
const router = Router();

router.use('/convertor', convertor);

export default router;