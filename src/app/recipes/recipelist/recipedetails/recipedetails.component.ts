import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppinglistService } from 'src/app/shoppinglist.service';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css']
})
export class RecipedetailsComponent implements OnInit {
  currentRecipe : Recipe;
  recipeId: number;
  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params : Params)=> { 
      this.recipeId = +params['id']
      this.currentRecipe = this.recipeService.getRecipeById(this.recipeId);
    });
  }
  addIngredientToSl() {
    this.recipeService.addIngredientToSL(this.currentRecipe.ingredients)
  }

  editRecipe() {
    this.router.navigate(['edit-recipe'] , { relativeTo : this.activeRoute })
  }
 
  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes'])
  }
}
