import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShopinglisteditComponent } from './shoppinglist/shopinglistedit/shopinglistedit.component';
import { RecipelistComponent } from './recipes/recipelist/recipelist.component';
import { HeaderComponent } from './header/header.component';
import { RecipeitemComponent } from './recipes/recipelist/recipeitem/recipeitem.component';
import { RecipedetailsComponent } from './recipes/recipelist/recipedetails/recipedetails.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor-service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';



@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    ShopinglisteditComponent,
    RecipelistComponent, 
    HeaderComponent,
    RecipeitemComponent,
    RecipedetailsComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    SpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // must added to use reactive approach in add/edit recipe form  
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
