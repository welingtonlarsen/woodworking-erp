export class ProductionOrderInfo {
  constructor(
    readonly id: number,
    readonly clientName: string,
    readonly ambientsQuantity: number,
    readonly fornituresQuantity: number,
    readonly productionStartDate: number,
    readonly deadlineDate: number,
    readonly purchaseOrderProgress: number,
  ) {}
}
