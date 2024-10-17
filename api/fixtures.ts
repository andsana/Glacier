import mongoose from 'mongoose';
import config from './config';
import Glacier from './models/Glaceier/Glacier';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['glaciers'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [glacier1, glacier2, glacier3] = await Glacier.create([
    {
      name: 'Glacier 1',
      location: { type: 'Point', coordinates: [41.12345, 74.54321] },
      waterSource: 'River A',
    },
    {
      name: 'Glacier 2',
      location: { type: 'Point', coordinates: [41.54321, 74.12345] },
      waterSource: 'Spring B',
    },
    {
      name: 'Glacier 3',
      location: { type: 'Point', coordinates: [41.6789, 74.6789] },
      waterSource: 'Glacier C',
    },
  ]);

  await db.close();
};

void run();
