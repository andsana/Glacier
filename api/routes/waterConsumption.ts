import mongoose, { Types } from 'mongoose';
import { Router } from 'express';
import { WaterConsumptionFields } from '../types';
import WaterConsumption from '../models/WaterConsumption/WaterConsumption';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const waterConsumptionRouter = Router();

waterConsumptionRouter.post('/', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    const waterConsumptionData: WaterConsumptionFields = {
      waterLossInCanal: {
        totalLength: parseFloat(req.body.waterLossInCanal.totalLength),
        averageWidth: parseFloat(req.body.waterLossInCanal.averageWidth),
        soilType: req.body.waterLossInCanal.soilType,
      },
      animalWaterConsumption: {
        cattle: parseInt(req.body.animalWaterConsumption.cattle),
        sheep: parseInt(req.body.animalWaterConsumption.sheep),
        horses: parseInt(req.body.animalWaterConsumption.horses),
        poultry: parseInt(req.body.animalWaterConsumption.poultry),
        climate: req.body.animalWaterConsumption.climate,
      },
      irrigationWaterConsumption: {
        grassArea: parseFloat(req.body.irrigationWaterConsumption.grassArea),
        wheatArea: parseFloat(req.body.irrigationWaterConsumption.wheatArea),
        climate: req.body.irrigationWaterConsumption.climate,
      },
      coordinates: {
        latitude: parseFloat(req.body.coordinates.latitude),
        longitude: parseFloat(req.body.coordinates.longitude),
      },
      glacierCount: parseInt(req.body.glacierCount),
    };

    const waterConsumption = new WaterConsumption(waterConsumptionData);
    await waterConsumption.save();

    res.status(201).send(waterConsumption);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

waterConsumptionRouter.get('/', auth, permit('admin'), async (_req, res, next) => {
  try {
    const results = await WaterConsumption.find();

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

waterConsumptionRouter.patch('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    const waterConsumptionData: WaterConsumptionFields = {
      waterLossInCanal: {
        totalLength: parseFloat(req.body.waterLossInCanal.totalLength),
        averageWidth: parseFloat(req.body.waterLossInCanal.averageWidth),
        soilType: req.body.waterLossInCanal.soilType,
      },
      animalWaterConsumption: {
        cattle: parseInt(req.body.animalWaterConsumption.cattle, 10), // добавлен radix 10 для parseInt
        sheep: parseInt(req.body.animalWaterConsumption.sheep, 10),
        horses: parseInt(req.body.animalWaterConsumption.horses, 10),
        poultry: parseInt(req.body.animalWaterConsumption.poultry, 10),
        climate: req.body.animalWaterConsumption.climate,
      },
      irrigationWaterConsumption: {
        grassArea: parseFloat(req.body.irrigationWaterConsumption.grassArea),
        wheatArea: parseFloat(req.body.irrigationWaterConsumption.wheatArea),
        climate: req.body.irrigationWaterConsumption.climate,
      },
      coordinates: {
        latitude: parseFloat(req.body.coordinates.latitude),
        longitude: parseFloat(req.body.coordinates.longitude),
      },
      glacierCount: parseInt(req.body.glacierCount, 10),
    };

    const result = await WaterConsumption.findByIdAndUpdate(
      req.params.id,
      { $set: waterConsumptionData }, // Обновляем все поля, кроме _id
      { new: true }, // Вернуть обновленный документ
    );

    if (!result) {
      return res.status(404).send({ message: 'Not found!' });
    }

    return res.send({ message: 'ok', data: result });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

waterConsumptionRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    const result = await WaterConsumption.findByIdAndDelete(req.params.id); // Удаление по _id

    if (!result) {
      return res.status(404).send({ message: 'Not found!' }); // Если документ не найден
    }

    return res.send({ message: 'Deleted successfully!' });
  } catch (e) {
    next(e); // Обработка ошибок
  }
});

export default waterConsumptionRouter;
