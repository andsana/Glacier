import { Document, Model } from 'mongoose';

export interface GlacierMutation {
  name: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  waterSource?: string;
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

interface UserDocument extends Document, UserFields, UserMethods {}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface WaterLossInCanal {
  totalLength: number; // Ориентировочная длина всех каналов
  averageWidth: number; // Ориентировочная средняя ширина каналов
  soilType: 'sand' | 'clay' | 'gravel' | 'rocky' | 'loam'; // Тип почвы
}

export interface AnimalWaterConsumption {
  cattle: number; // Крупный рогатый
  sheep: number; // Овцы, козы
  horses: number; // Лошади
  poultry: number; // Птицы
  climate: 'cold' | 'moderate' | 'hot'; // Выбор климата
}

export interface IrrigationWaterConsumption {
  grassArea: number; // Площадь для травы
  wheatArea: number; // Площадь для пшеницы
  climate: 'cold' | 'moderate' | 'hot'; // Выбор климата
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WaterConsumptionFields {
  waterLossInCanal: WaterLossInCanal;
  animalWaterConsumption: AnimalWaterConsumption;
  irrigationWaterConsumption: IrrigationWaterConsumption;
  glacierCount: number;
  coordinates?: Coordinates;
  createdAt?: Date;
  updatedAt?: Date;
}
