export class ProductionOrder {
  constructor(
    readonly id: number,
    readonly start: number,
    readonly deadline: number,
    readonly clientName: string,
    readonly rooms: Room[],
  ) {}
}

export class Room {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly fornitures: Forniture[],
  ) {}
}

export class Forniture {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly productionStart: number,
    readonly containsPurchaseOrder: boolean,
    readonly forecast: Date,
    readonly woodWorker: string,
    readonly readline: number,
  ) {}
}
