export class FamilyInventoryDTO {
  idItem: number=0;
  ingredientName: string='';
  amountAvailable: number=0;
  purchaseDate: Date = new Date();
  dueDate: string='';
  minimumStock: number=0;
}