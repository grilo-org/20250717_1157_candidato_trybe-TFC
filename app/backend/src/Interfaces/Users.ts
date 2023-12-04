import { ICRUDModel } from './CRUD';

export interface InterfaceUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface InterfaceUserLogin {
  email: string;
  password: string;
}

export type InterfaceUserModel = ICRUDModel<InterfaceUser>;
