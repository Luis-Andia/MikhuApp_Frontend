export class ExpiredDTO{
    idItem?: number;
    idIngredient: number = 0;
    nomIngredient: string = '';
    amountAvailable: number = 0;
    purchaseDate: Date = new Date();
    dueDate: Date = new Date();
    minimumStock: number = 0
}