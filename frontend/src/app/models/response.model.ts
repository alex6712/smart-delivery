export class ResponseItems<T> {
  constructor(
    public count: number,
    public items: T[],
    public num_offset: number | null,
    public detail?: string
  ) {}
}
