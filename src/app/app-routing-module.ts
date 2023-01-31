import {NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipedetailsComponent } from './recipes/recipelist/recipedetails/recipedetails.component';
import { RecipelistComponent } from './recipes/recipelist/recipelist.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

const AppRoutes : Routes = [
    { path : 'recipes' , canActivate: [AuthGuard],component: RecipesComponent , children :
    [
        { path :'' , component: RecipeStartComponent},
        { path : 'new-recipe', component: RecipeEditComponent},
        { path : ':id' , component: RecipedetailsComponent },
        { path: ':id/edit-recipe', component: RecipeEditComponent}
    ]
    },

    { path : '' , redirectTo: '/recipes' , pathMatch:'full'},
    
    { path : 'shopping-list' , component: ShoppinglistComponent},
    { path :'auth' , component: AuthComponent},
  ]

@NgModule({
    imports : [RouterModule.forRoot(AppRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{
    constructor (private activeRouter : ActivatedRoute){}
}