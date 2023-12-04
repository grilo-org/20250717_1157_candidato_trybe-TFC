import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import jwtUtil from '../utils/jwt.util';
import { Token } from '../Interfaces/TokenType';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { LoginType } from '../Interfaces/LoginType';

export default class LoginService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) { }

  public async Login(login: LoginType): Promise<ServiceResponse<Token>> {
    if (!login.email || !login.password) {
      return { status: 'INVALID_DATA',
        data: { message: 'All fields must be filled' } };
    }

    const findUser = await this.userModel.findUser(login);
    const isValidEmail = await this.userModel.isValidEmail(login.email);
    const emailRegex = /\S+@\S+\.\S+/;
    const validPassword = login.password.length >= 6;

    if (!findUser || !bcrypt.compareSync(login.password, findUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    if (isValidEmail === false || !emailRegex.test(login.email) || !validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { email, password } = findUser;
    const token = jwtUtil.sign({ email, password });
    return { status: 'SUCCESS', data: { token } };
  }
}
