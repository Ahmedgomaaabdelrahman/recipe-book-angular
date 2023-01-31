import { Ingredient } from "../shoppinglist/ingredient.model";

export class Recipe {
    public "name": string;
    public "description": string;
    public "image" : string; 
    public "id": number;
    public "ingredients": Ingredient[];
    public "spicy": boolean;
    public "vegetarian": boolean;
    public "price": number;
  
    constructor(id: number , name: string , description: string,ingredients: [] , spicy:boolean,vegetarian , price:number , imagePath : string ) {
        this.name = name;
        this.description = description;
        this.image = imagePath ;
        this.id = id;
        this.ingredients  = ingredients ;
        this.spicy = spicy ;
        this.vegetarian = vegetarian;
        this.price = price
    }
}