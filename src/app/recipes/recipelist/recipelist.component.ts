import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeChanged : Subscription;
  constructor(private recipesService :RecipeService, private router: Router, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.recipeChanged = this.recipesService.recipesChanged.subscribe((recipesData: Recipe[]) => {
      this.recipes = recipesData;
    });

  }
  addNewRecipe() {
    this.router.navigate(['new-recipe'] , { relativeTo : this.activeRoute })
  }

  ngOnDestroy(): void {
      this.recipeChanged.unsubscribe();
  }

}
