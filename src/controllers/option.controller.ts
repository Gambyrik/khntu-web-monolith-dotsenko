import { Request, Response } from 'express';
import { OptionService } from '../services/option.service';
import { catchAsync } from '../utils/catchAsync';

const optionService = new OptionService();

export class OptionController {
  static getAll = catchAsync((req: Request, res: Response) => {
    const items = optionService.getAll();
    res.status(200).json({ status: 'success', results: items.length, data: items });
  });

  static getById = catchAsync((req: Request, res: Response) => {
    const item = optionService.getById(Number(req.params.id));
    res.status(200).json({ status: 'success', data: item });
  });

  static create = catchAsync((req: Request, res: Response) => {
    const item = optionService.create(req.body);
    res.status(201).json({ status: 'success', data: item });
  });
}
