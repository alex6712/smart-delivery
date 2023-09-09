export class LoginResponse {
  constructor(
    public code: number,
    public message: string,
    public access_token: string,
    public refresh_token: string,
    public token_type: string
  ) {}
}

export class RegResponse {
  constructor(
    public code?: number,
    public message?: string,
    public detail?: any
  ) {}
}

export class RefreshResponse {
  constructor() {}
}

export class MeResponse {
  constructor(
    public code: number,
    public message: string,
    public id: string,
    public username: string,
    public email: string,
    public phone: string,
    public detail?: string
  ) {}
}
