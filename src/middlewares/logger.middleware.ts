import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const start = process.hrtime.bigint();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms.toFixed(2)} ms)`);
  });
  next();
};
