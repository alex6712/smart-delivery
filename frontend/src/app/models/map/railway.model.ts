export class RailWay {
  constructor(
    public departure_station_code: number,
    public destination_station_code: number
  ) {}
}

export class RailWayAnswer {
  constructor(
    public code: number,
    public message: string,
    public distance: number,
    public cost: number
  ) {}
}
