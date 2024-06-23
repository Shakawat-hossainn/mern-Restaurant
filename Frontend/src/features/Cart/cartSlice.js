import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
  amount: 0,
  total: 0,
  error: null,
};

// Async thunk for updating the quantity of cart items
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/cart/updateQuantity/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (!response.ok) {
        // Handle error response
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.cartItems = action.payload;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartItems = newCartItems;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.quantity;
        total += item.productId.price * item.quantity;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { _id, quantity } = action.payload;
        const findItem = state.cartItems.find((item) => item._id === _id);
        if (findItem) {
          findItem.quantity = quantity;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update cart item quantity';
      });
  },
});

export const { addToCart, clearCart, removeItem, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
