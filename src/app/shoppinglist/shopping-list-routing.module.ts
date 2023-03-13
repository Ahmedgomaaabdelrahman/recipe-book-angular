import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "../auth/auth.component";
import { ShoppinglistComponent } from "./shoppinglist.component";

const AppRoutes : Routes = [
    { path : '' , component: ShoppinglistComponent},
    
  ]

@NgModule({
    imports : [RouterModule.forChild(AppRoutes)],
    exports : [RouterModule]
})

export class ShoppingListRoutingModule {

}