import express from 'express';
import { pool } from '../db';

const glaciersRouter = express.Router();

glaciersRouter.get('/', async (_req, res, next) => {
  try {
    // Выполняем SQL-запрос к таблице
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM glacier'); // Используем пул для выполнения SQL-запроса

    // Проверяем, есть ли данные ледников
    if (rows.length === 0) {
      return res.status(404).send({ error: 'No glaciers found!' });
    }

    res.send(rows);
  } catch (err) {
    // Передаем ошибку в next для централизованной обработки
    next(err);
  }
});

import { RowDataPacket } from 'mysql2';

glaciersRouter.get('/:id', async (req, res, next) => {
  try {
    const glacierId = req.params.id;
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM glacier WHERE glacier_id = ?', [glacierId]);

    if (rows.length === 0) {
      return res.status(404).send({ error: 'Glacier not found!' });
    }

    res.send(rows);
  } catch (err) {
    next(err); // Передаем ошибку в middleware для дальнейшей обработки
  }
});

export default glaciersRouter;
