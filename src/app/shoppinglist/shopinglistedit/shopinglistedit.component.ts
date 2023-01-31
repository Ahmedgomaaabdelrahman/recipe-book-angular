import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppinglistService } from 'src/app/shoppinglist.service';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-shopinglistedit',
  templateUrl: './shopinglistedit.component.html',
  styleUrls: ['./shopinglistedit.component.css']
})
export class ShopinglisteditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm : NgForm;

  ingredientDataSub : Subscription;
  editMode: boolean = false;
  constructor(private sl: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredientDataSub = this.sl.editIngredientData.subscribe(currentIngredient => {
      this.shoppingListForm.setValue({
        nameInput:currentIngredient.name,
        amountInput: currentIngredient.amount,
      });
      this.editMode = true;
    }); 
  }

  addNewIngredient(f: NgForm) {
    const ingredient = new Ingredient(f.value.nameInput,f.value.amountInput);
    if(this.editMode) {
      this.sl.updateIngredient(ingredient);
    }
    else {
      this.sl.addNewIngredient(ingredient);
    }
    this.resetSLForm();
  }

  ngOnDestroy(){
    this.ingredientDataSub.unsubscribe();
  }

  resetSLForm(){
    this.shoppingListForm.reset();
    this.editMode = false
  }

  deleteIngredient(){
    this.sl.deleteIngredient();
    this.resetSLForm();
 
  }
}
