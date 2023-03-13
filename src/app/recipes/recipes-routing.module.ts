import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipedetailsComponent } from "./recipelist/recipedetails/recipedetails.component";
import { RecipesComponent } from "./recipes.component";

const AppRoutes : Routes = [
    { path : '' , canActivate: [AuthGuard],component: RecipesComponent , children :
    [
        { path :'' , component: RecipeStartComponent},
        { path : 'new-recipe', component: RecipeEditComponent},
        { path : ':id' , component: RecipedetailsComponent },
        { path: ':id/edit-recipe', component: RecipeEditComponent}
    ]
    },


  ]

@NgModule({
    imports : [RouterModule.forChild(AppRoutes)],
    exports : [RouterModule]
})

export class RecipesRoutingModule {

}