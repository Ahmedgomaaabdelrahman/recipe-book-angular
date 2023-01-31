import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            // using take to make sure we get the user data once and then unsubscribe
            // bcz if i still using it without take if user is emitted it will trigger the auth and there will be more ongoing requests
            take(1),
            map(user => {

            // convert user object to boolean value
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            else {
                // to let it navigate if there is no user
                return this.router.createUrlTree(['/auth'])
            }
        }), 
        // tap( isAuth => {
        //     // we receive true or false from map operator 
        //     if(!isAuth){
        //         this.router.navigate(['/auth'])
        //     }
        //     })
        )
    }
}