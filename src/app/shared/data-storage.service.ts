import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipes.service";


@Injectable({ providedIn : 'root'})
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService, private authService:AuthService){}

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-99f8d.firebaseio.com/recipes.json', recipes).subscribe((res) => {
            console.log(res)
        })
    }

    getRecipes(){
        // we use take operator to tell rxjs that I need only one subscription and unsubscribe automatically
        // we use exhaustMap operator to combine the two observables it will wait until first observable finished
        // and then return the new observables
        return  this.http.get<Recipe[]>('https://recipe-book-99f8d.firebaseio.com/recipes.json')
        .pipe( map(recipes => {
            return recipes.map((recipe) => {
                return {...recipe , ingredients: recipe.ingredients ?? [] } })
            }))
        .subscribe(user => {
                this.recipeService.setRecipes(user);
                console.log(user)
            });

    }
}