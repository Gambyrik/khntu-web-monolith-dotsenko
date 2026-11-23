import { Request, Response, NextFunction, RequestHandler } from 'express';

// Обгортка для контролерів: будь-яка помилка (sync або async) передається в next()
export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => unknown): RequestHandler =>
  (req, res, next) => {
    Promise.resolve()
      .then(() => fn(req, res, next))
      .catch(next);
  };
