import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeID : number;
  editMode : boolean = false;
  recipeForm : FormGroup;
  constructor(private activeRoute: ActivatedRoute, private recipeService: RecipeService , private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) =>{ 
      this.recipeID = +params["id"];
      this.editMode = params["id"] != null   // if edit param id will be have a value else will not
      this.initForm();
    });
    
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode) {
      const recipeData = this.recipeService.getRecipeById(this.recipeID);

      recipeName = recipeData.name;
      recipeImagePath = recipeData.image;
      recipeDescription = recipeData.description;


      // check if there are already ingredients or no
      if(recipeData["ingredients"]){
        for(let ingredient of recipeData["ingredients"]){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name , Validators.required),
              'amount': new FormControl(ingredient.amount , 
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName , Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });

  }


  onSubmit() {
    const recipesLength = +(<Recipe[]>this.recipeService.getRecipes()).length;
    const recipeId = this.editMode ? this.recipeID :     recipesLength + 1;
    const newRecipe = new Recipe(
      recipeId,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients'],
      true,
      true,
      20,
      this.recipeForm.value['imagePath']
    );
    if(this.editMode){
      this.recipeService.updateRecipe(newRecipe , this.recipeID);
    }
    else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.onResetRecipeForm()
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddNewIngredient() {
    // we cast this to tell angular that it will be form array
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null , 
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
      )
  }

  deleteIngredient(index) {
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(index, 1);
  }


  onResetRecipeForm(){
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  clearAllIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}
 