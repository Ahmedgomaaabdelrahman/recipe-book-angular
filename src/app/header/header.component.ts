import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})


export class HeaderComponent implements OnInit, OnDestroy{
    private authSubscription: Subscription;
    isAuthenticated= false;
    constructor(private dataStorage: DataStorageService, private authService: AuthService){}

    ngOnInit(): void {
        this.authSubscription = this.authService.user.subscribe( user => {
            this.isAuthenticated = !user ? false : true;
        })
    }
    onSaveData(){
        this.dataStorage.storeRecipe();
    }
    onFetchData(){
        this.dataStorage.getRecipes(); 
    }

    onLogout(){
        this.authService.logout();
        this.isAuthenticated = false;
    }
    ngOnDestroy(): void {
        this.authSubscription.unsubscribe()
    }
}