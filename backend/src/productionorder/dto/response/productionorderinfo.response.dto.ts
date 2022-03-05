export class ProductionOrderInfo {
  constructor(
    readonly productionOrderId: number,
    readonly clientName: string,
    readonly ambientsQuantity: number,
    readonly fornituresQuantity: number,
    readonly productionStartDate: number,
    readonly deadlineDate: number,
  ) {}
}
