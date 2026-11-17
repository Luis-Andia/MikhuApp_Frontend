export class RecommendationDTO {
  dish: string=''
  compatibility: number=0;          // 0 a 100
  ingredientsUsed: string[]=[]
  missingIngredients: string[]=[]
}