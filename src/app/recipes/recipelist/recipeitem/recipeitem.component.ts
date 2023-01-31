import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipeitem',
  templateUrl: './recipeitem.component.html',
  styleUrls: ['./recipeitem.component.css']
})
export class RecipeitemComponent implements OnInit {

  @Input('recipeData') recipeData : Recipe;

  constructor(private recipesService  : RecipeService) { }

  ngOnInit(): void {
    console.log(this.recipeData)
  }

}
