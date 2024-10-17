import express from 'express';
import cors from 'cors';
import glaciersRouter from './routes/glaciers';
import userRouter from './routes/users';
import mongoose from 'mongoose';
import config from './config';
import waterConsumptionRouter from './routes/waterConsumption'; // Подключение маршрутов

const app = express();
const port = 8000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Подключаем маршруты
app.use('/glacier', glaciersRouter);
app.use('/users', userRouter);
app.use('/waterConsumption', waterConsumptionRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
  });

  // Обработчик для корректного завершения работы и отключения от базы данных
  const gracefulShutdown = () => {
    console.log('Server is shutting down...');
    mongoose.disconnect().then(() => {
      console.log('Mongoose disconnected');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown); // Для обработки Ctrl+C в консоли
};

void run();
