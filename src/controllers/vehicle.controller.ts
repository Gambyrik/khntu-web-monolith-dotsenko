import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';
import { catchAsync } from '../utils/catchAsync';

const vehicleService = new VehicleService();

export class VehicleController {
  static getAll = catchAsync((req: Request, res: Response) => {
    const items = vehicleService.getAll(req.query.status as string | undefined);
    res.status(200).json({ status: 'success', results: items.length, data: items });
  });

  static getById = catchAsync((req: Request, res: Response) => {
    const item = vehicleService.getById(Number(req.params.id));
    res.status(200).json({ status: 'success', data: item });
  });

  static create = catchAsync((req: Request, res: Response) => {
    const item = vehicleService.create(req.body);
    res.status(201).json({ status: 'success', data: item });
  });

  static remove = catchAsync((req: Request, res: Response) => {
    vehicleService.delete(Number(req.params.id));
    res.status(204).send();
  });
}
