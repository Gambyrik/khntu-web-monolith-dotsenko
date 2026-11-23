import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

// Невідомий маршрут -> 404 через глобальний errorHandler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Маршрут ${req.method} ${req.originalUrl} не знайдено`, 404));
};
