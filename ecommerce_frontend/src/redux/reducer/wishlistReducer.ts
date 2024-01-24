import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { wishlistInitialState } from "../../types/reducer-types";
import { WishlistItem } from "../../types/types";

const initialState: wishlistInitialState = {
  loading: false,
  wishlist: [],
};

export const wishlistReducer = createSlice({
  name: "wishlistReducer",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const item = action.payload;
      const existItem = state.wishlist.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        state.wishlist = state.wishlist.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        state.wishlist.push(item);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(
        (x) => x.productId !== action.payload
      );
    },
  },
});

export const {addToWishlist,removeFromWishlist} = wishlistReducer.actions;
