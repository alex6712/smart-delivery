export class LoginForm {
  constructor(public username: string, public password: string) {}
}

export class RegForm {
  constructor(
    public username: string,
    public email: string,
    public phone: string,
    public password: string
  ) {}
}
