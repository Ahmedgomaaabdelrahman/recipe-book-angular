import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
    'selector': 'auth-app',
    'styleUrls' : ['./auth.component.css'],
    'templateUrl' : 'auth.component.html',
})

export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    loading = false;
    error = null;

    // we write here the placeholder as we need to access the element of type
    // will find the fist place that we use that directive in the dom
    @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;
    private compSub : Subscription; 
    constructor(private componentFactoryResolver: ComponentFactoryResolver , private authService: AuthService , private router: Router){}
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
            this.showErrorMessage(error)
            this.loading = false; 
        });

        authenticationForm.reset()
    }
    onHandleClose(){
        this.error = null
    }
    private showErrorMessage(errorMessage : string) {
        // for first aoption will be to import { AlertComponent } from "../shared/alert/alert.component"; 
        // and insatiate a class from it 
        // const alertComp = new AlertComponent();
        // this is a valid TS code but not a angular code 
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        // where we will use this component
        const hostViewContainer = this.alertHost.viewContainer;
        // clear what exist before
        hostViewContainer.clear()
        const componentRef = hostViewContainer.createComponent(alertCompFactory);
        componentRef.instance.message = errorMessage;
        // clear the content in host container when click close in the modal
        this.compSub = componentRef.instance.close.subscribe(() => {
            this.compSub.unsubscribe();
            hostViewContainer.clear()
        })
    }

    ngOnDestroy(): void {
        if(this.compSub) this.compSub.unsubscribe()
        
    }
}