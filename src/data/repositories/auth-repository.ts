import { autoInjectable } from 'tsyringe';
import IAuthRepository from '../../domain/interfaces/auth-interface';
import User from '../../domain/models/user-model';

@autoInjectable()
class AuthRepository implements IAuthRepository {
  public async login(email: string): Promise<any> {
    return await User.findOne({
      email: email,
    });
  }

  public async register(data: any): Promise<any> {
    const { email } = data;
    if (await this._checkEmail(email)) {
      return undefined;
    }
    return await new User(data).save();
  }

  private async _checkEmail(email: string): Promise<any> {
    const result = await User.findOne({ email: email });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}

export default AuthRepository;
