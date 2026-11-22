export class LowStockItemsDTO {
    idItem?: number;
    nomFamily: string = '';
    nomIngredient: string = '';
    amountAvailable: number = 0;
    purchaseDate: Date = new Date();
    dueDate: Date = new Date();
    minimumStock: number = 0;
}