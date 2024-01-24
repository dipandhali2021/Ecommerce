import { CartItem, ShippingInfo, User, WishlistItem } from "./types";

export interface userReducerInitialState {
    user:User | null,
    loading:boolean,

}

export interface cartReducerInitialState {
    loading:boolean,
    cartItems:CartItem[],
    subtotal:number,
    tax:number,
    shippingCharge:number,
    discount:number,
    total:number,
    shippingInfo:ShippingInfo,
}
export interface wishlistInitialState {
    loading:boolean,
    wishlist:WishlistItem[],
    
}