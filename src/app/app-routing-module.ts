import {NgModule } from '@angular/core';
import { ActivatedRoute, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const AppRoutes : Routes = [
    { path : '' , redirectTo: '/recipes' , pathMatch:'full'},
    { path: 'recipes' , loadChildren: () => import('./recipes/recipes.module').then(
        module => module.RecipesModule
    )},
    { path:'shopping-list', loadChildren: () => import('./shoppinglist/shopping-list.module').then(
        module => module.ShoppingListModule
    )},
    { path:'auth', loadChildren: () => import('./auth/auth.module').then(
        module => module.AuthModule
    )}
  ]

@NgModule({
    imports : [RouterModule.forRoot(AppRoutes, {preloadingStrategy: PreloadAllModules})],
    exports : [RouterModule]
})
export class AppRoutingModule{
    constructor (private activeRouter : ActivatedRoute){}
}