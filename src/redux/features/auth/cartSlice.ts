import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
  _id: string;
  title: string;
  images: string;
  price: number;
  selectedQty: number;
};

type TCartState = {
  items: TCartItem[];
};

const initialState: TCartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const existing = state.items.find(item => item._id === action.payload._id);
      if (!existing) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        item.selectedQty += action.payload.amount;
        if (item.selectedQty < 1) {
          item.selectedQty = 1; // minimum 1 quantity
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
