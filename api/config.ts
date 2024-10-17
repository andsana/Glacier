import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT as string, 10) || 3306, // Преобразуем в число
  },
  mongoose: {
    db: 'mongodb://localhost/glacier',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

console.log(config.google.clientId);

export default config;
