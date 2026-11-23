import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';
import vehicleRoutes from './routes/vehicle.routes';
import optionRoutes from './routes/option.routes';

const app: Express = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware); // Логування кожного запиту

// Base Health Check Endpoint (+ розширена системна інформація)
app.get('/api/v1/health', (req: Request, res: Response) => {
  const mem = process.memoryUsage();
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: {
      rssMB: +(mem.rss / 1024 / 1024).toFixed(1),
      heapUsedMB: +(mem.heapUsed / 1024 / 1024).toFixed(1),
      heapTotalMB: +(mem.heapTotal / 1024 / 1024).toFixed(1)
    }
  });
});

// REST API ресурсів варіанта 4 (оренда авто)
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/options', optionRoutes);

app.use(notFoundHandler); // 404 для невідомих маршрутів
app.use(errorHandler); // Глобальний обробник помилок (в кінці!)

export default app;
