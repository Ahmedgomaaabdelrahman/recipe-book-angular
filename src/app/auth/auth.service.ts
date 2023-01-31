import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError} from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean,
}
@Injectable({
    providedIn : 'root'
})
export class AuthService {

    // we use the logged user as a subject.
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any;

    constructor(private http:HttpClient, private router: Router){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-EWfARvTRCpc7pu41l9492DI9hL_O_ck' , {
            email :email ,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handelError), 
        tap( responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        }))
    }


    signIn(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-EWfARvTRCpc7pu41l9492DI9hL_O_ck', {
            email :email ,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handelError) ,  tap( responseData => {
            this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        }));
    }

    autoLogin(){
        // convert string to obj 
       const userData: {  
        email:string, 
        id: string, 
        _token: string, 
        _tokenExpirationDate: string
       } = JSON.parse(localStorage.getItem('userData'));
       if(!userData){
        return;
       }

       const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

       // if the token is not expire set it as a current user
       if(loadedUser.token){ 
        this.user.next(loadedUser);

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
       }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    
    // we must clear the timeout after the user click logout as 
    // the timer will still working and after the expirationDuration will call logout again 
    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string,userId: string, token:string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        // to start the timer for logout
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user) ) 
    }
    private handelError(errorMessage){
        let error_message = 'unknown error message';
        if(!errorMessage.error || !errorMessage.error.error) {
            return throwError(error_message);
        }

        switch(errorMessage.error.error.message){
            case 'EMAIL_EXISTS':
                error_message = 'the email already exist';
                break;
            case 'EMAIL_NOT_FOUND':
                error_message = 'the email is not found';
                break;
            case 'INVALID_PASSWORD':
                error_message = 'the password is not valid';
                break;
        }
        return throwError(error_message);
    }
}