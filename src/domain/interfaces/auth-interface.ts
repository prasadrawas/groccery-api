interface IAuthRepository {
  login(email: string): Promise<any>;
  register(data: Object): Promise<any>;
}

export default IAuthRepository;
