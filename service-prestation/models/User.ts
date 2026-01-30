import { Schema, Document, model, models } from 'mongoose';
import { IUserBase } from '@/types';
import bcrypt from 'bcryptjs';

export interface IUser extends Document, IUserBase {}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  image: { type: String },
  role: { type: String, enum: ['user', 'manager', 'admin'], default: 'user' },
}, {
  timestamps: true,
});

// Middleware pour hacher le mot de passe avant de sauvegarder
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
