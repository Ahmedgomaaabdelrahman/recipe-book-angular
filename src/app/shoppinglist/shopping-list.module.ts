import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppinglistComponent } from "./shoppinglist.component";
import { ShopinglisteditComponent } from "./shopinglistedit/shopinglistedit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations:[
        ShoppinglistComponent,
        ShopinglisteditComponent,
    ],
    imports:[
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ],

})

export class ShoppingListModule {

}