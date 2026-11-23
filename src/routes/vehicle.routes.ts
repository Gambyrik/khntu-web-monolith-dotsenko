import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const router = Router();

router.get('/', VehicleController.getAll);
router.get('/:id', VehicleController.getById);
router.post('/', VehicleController.create);
router.delete('/:id', VehicleController.remove);

export default router;
