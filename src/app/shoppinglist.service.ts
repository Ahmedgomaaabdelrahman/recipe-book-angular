import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { Ingredient } from './shoppinglist/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {
  ingredients : Ingredient[] = [
    new Ingredient('Apples' , '5'),
    new Ingredient('Tomato', '7'),
    new Ingredient('Potato', '4'),
  ];
  ingredientsAdded = new Subject<Ingredient[]>();
  editIngredientData = new Subject<Ingredient>();
  editingIndex : string;

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
    
  }

  addNewIngredient(ingredient :Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsAdded.next(this.ingredients);
  }

  addIngredientsFromRecipe(ingredients:  Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsAdded.next(this.ingredients);
  }

  editIngredient(ingredient :Ingredient , index:string) {
    this.editingIndex = index;
    this.editIngredientData.next(ingredient);
  }

  updateIngredient(ingredient: Ingredient){
    console.log(ingredient);
    this.ingredients[this.editingIndex] = ingredient;
    this.ingredientsAdded.next(this.ingredients);


  }

  deleteIngredient(){
    this.ingredients.splice(+this.editingIndex, 1);
    this.ingredientsAdded.next(this.ingredients);
  }
}
