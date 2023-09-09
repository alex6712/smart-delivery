export class ResponseItems<T> {
  constructor(
    public count: number,
    public items: T[],
    public detail?: string,
    public code?: number,
    public access_token?: string,
    public refresh_token?: string,
    public message?: string
  ) {}
}

export class ResponseItem {
  constructor(
    public count: number,
    public detail?: string,
    public code?: number,
    public access_token?: string,
    public refresh_token?: string,
    public message?: string
  ) {}
}
