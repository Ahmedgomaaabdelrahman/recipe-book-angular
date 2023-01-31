import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ShoppinglistService } from "../shoppinglist.service";
import { Ingredient } from "../shoppinglist/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private recipes: Recipe[] = [
        {
            "id": 0,
            "name": "Brownie",
            "description": "A delicious cake with chocolate and hazelnuts",
            "ingredients": [new Ingredient('toto' , '66'), new Ingredient('soso' , '40')],
            "spicy": false,
            "vegetarian": false,
            "price": 15,
            "image": "https://i.imgur.com/7WbfaDN.png"
        }
      
    ];
    selectedRecipe = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    constructor(private sl: ShoppinglistService) {
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        console.log(recipes)
        this.recipesChanged.next(this.recipes);
    }
    getRecipes() {
        return this.recipes.slice();
    }
    addIngredientToSL(ingredients){
        this.sl.addIngredientsFromRecipe(ingredients)
    }
    getRecipeById(recipeID:number) {
        const recipeData = this.recipes.find((rec) => rec.id === recipeID);
        return recipeData;
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }
    updateRecipe(recipe:Recipe, recipeId: number) {
        const recipeIndex = this.recipes.findIndex((recipe: Recipe) => recipe.id == recipeId);
        this.recipes[recipeIndex] = recipe;
        this.recipesChanged.next(this.recipes.slice())
    }
    
    deleteRecipe(recipeId: number) {
        const recipeIndex = this.recipes.findIndex((recipe: Recipe) => recipe.id == recipeId);

        this.recipes.splice(recipeIndex, 1);
        this.recipesChanged.next(this.recipes.slice())
    }

    
}