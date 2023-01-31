import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
    'selector': 'auth-app',
    'styleUrls' : ['./auth.component.css'],
    'templateUrl' : 'auth.component.html',
})

export class AuthComponent{
    isLoginMode = true;
    loading = false;
    error = null;
 

    constructor(private authService: AuthService , private router: Router){}
    switchLoginMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onHandleAuth(authenticationForm : NgForm){ 
        if(!authenticationForm.valid){
            return;
        }
        this.loading = true; 
        // we create this to not repeat the code of handling the response in the same 2 cases (login , signup)
        let authObs: Observable<AuthResponse>;
        // login
        if(this.isLoginMode){
            this.loading = true; 
            authObs = this.authService.signIn(authenticationForm.value.emailInput, authenticationForm.value.passwordInput);
        }
        // sign up
        else{ 
            authObs = this.authService.signUp(authenticationForm.value.emailInput, authenticationForm.value.passwordInput )
        }
        authObs.subscribe((response) => {
            console.log(response);
            this.loading = false;
            this.router.navigate(['/recipes'])
        }, error => {
            this.error = error;
            this.loading = false; 
        });

        authenticationForm.reset()
    }

}