export class ItemDTO {
    idItem?: number
    idFamily: number = 0
    idIngredient: number = 0
    amountAvailable: number = 0
    purchaseDate: Date = new Date()
    dueDate: Date = new Date()
    minimumStock: number = 0
}