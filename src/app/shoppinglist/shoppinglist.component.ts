import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShoppinglistService } from '../shoppinglist.service';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit , OnDestroy {
  ingredients: Ingredient[];
  private ingredientsAddedSub: Subscription;

  constructor(private sl:ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.sl.getIngredients();
    this.ingredientsAddedSub = this.sl.ingredientsAdded.subscribe((allIngredients : Ingredient[]) => {
      this.ingredients = allIngredients; 
    });
  }

  ngOnDestroy() {
    this.ingredientsAddedSub.unsubscribe()
  }
  showIngredientData(ingredient: Ingredient , index:string) {
    this.sl.editIngredient(ingredient, index);
  }
}
