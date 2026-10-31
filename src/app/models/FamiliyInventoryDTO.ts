export class FamilyInventoryDTO {
    idItem:number = 0;
    ingredientName:string = '';
    amountAvailable: number=0;
    purchaseDate:Date = new Date();
    dueDate:Date = new Date();
    minimumStock: number = 0;  
}