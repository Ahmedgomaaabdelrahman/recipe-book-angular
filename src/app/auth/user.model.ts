export class User {
    constructor(public email:string, public id: string, private _token: string, private _tokenExpirationDate: Date){
        
    }


    // the getter is function but it calling like a property user.token
    // we use it to add some validation before return the token 
    get token(){
        // if there is no expiration date or it is ended
        if(!this._tokenExpirationDate || new Date > this._tokenExpirationDate) {
            return null;
        }
        return this._token
    }
}