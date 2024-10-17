import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';
import { UserDocument, UserModel } from '../../types';

const SALT_WORK_FACTOR = 10;

// Определение интерфейса для документа пользователя

// Создание схемы пользователя
const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: UserDocument, email: string): Promise<boolean> {
        if (!this.isModified('email')) return true; // Проверка на изменение email

        const user = await mongoose.model('User').findOne({ email });
        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['client', 'admin'],
    default: 'client',
  },
  displayName: String,
  googleID: String,
});

// Методы схемы
UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

// Pre-хук для хеширования пароля перед сохранением
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Удаление поля пароля из JSON при отправке данных
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Создание модели пользователя
const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;
