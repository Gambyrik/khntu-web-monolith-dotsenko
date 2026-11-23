import { Router } from 'express';
import { OptionController } from '../controllers/option.controller';

const router = Router();

router.get('/', OptionController.getAll);
router.get('/:id', OptionController.getById);
router.post('/', OptionController.create);

export default router;
