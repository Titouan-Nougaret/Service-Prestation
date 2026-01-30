export interface IUserBase {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}
