import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipedetailsComponent } from "./recipelist/recipedetails/recipedetails.component";
import { RecipeitemComponent } from "./recipelist/recipeitem/recipeitem.component";
import { RecipelistComponent } from "./recipelist/recipelist.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";


@NgModule({
    declarations:[
        RecipelistComponent, 
        RecipeitemComponent,
        RecipedetailsComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ],

})
export class RecipesModule{

}