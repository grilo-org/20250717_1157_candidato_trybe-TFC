import { InterfaceUserLogin } from '../Interfaces/Users';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel {
  private model = SequelizeUser;

  public async findUser(user: InterfaceUserLogin): Promise<InterfaceUserLogin | null> {
    const userData = await this.model.findOne({ where: { email: user.email } });
    if (!userData) {
      return null;
    }
    return userData.dataValues;
  }
}
