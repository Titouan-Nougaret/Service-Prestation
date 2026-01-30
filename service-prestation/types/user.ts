export interface IUserBase {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'manager' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}
