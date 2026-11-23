import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

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

export default app;
