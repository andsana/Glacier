import mongoose, { Schema } from 'mongoose';

const WaterConsumptionSchema = new Schema(
  {
    waterLossInCanal: {
      totalLength: { type: Number, required: true }, // Ориентировочная длина всех каналов
      averageWidth: { type: Number, required: true }, // Ориентировочная средняя ширина каналов
      soilType: {
        type: String,
        enum: ['sand', 'clay', 'gravel', 'rocky', 'loam'], // Тип почвы
        required: true,
      },
      // waterLossPerDay: { type: Number, required: true }, // Водопотери в сутки
      // days: { type: Number, required: true }, // Количество дней
    },
    animalWaterConsumption: {
      cattle: { type: Number, required: true }, // Крупный рогатый скот
      sheep: { type: Number, required: true }, // Овцы
      horses: { type: Number, required: true }, // Лошади
      poultry: { type: Number, required: true }, // Птицы
      climate: { type: String, enum: ['cold', 'moderate', 'hot'], required: true }, // Выбор климата
    },
    irrigationWaterConsumption: {
      grassArea: { type: Number, required: true }, // Площадь для травы
      wheatArea: { type: Number, required: true }, // Площадь для пшеницы
      climate: { type: String, enum: ['cold', 'moderate', 'hot'], required: true }, // Выбор климата
    },
    coordinates: {
      latitude: { type: Number }, // Широта
      longitude: { type: Number }, // Долгота
    },
    glacierCount: { type: Number, required: true }, // Количество ледников
  },
  { timestamps: true },
);

const WaterConsumption = mongoose.model('WaterConsumption', WaterConsumptionSchema);

export default WaterConsumption;
