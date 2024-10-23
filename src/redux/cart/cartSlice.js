import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.items.find(
                (i) => i.id === product.id,
            );
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.items.push(product);
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.items.find(
                (item) => item.id === productId,
            );
            if (existingProduct) {
                existingProduct.quantity += 1; // Aumentar cantidad en 1
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const existingProduct = state.items.find(
                (item) => item.id === productId,
            );
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1; // Disminuir cantidad en 1
            }
        },
        setQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.items.find(
                (item) => item.id === productId,
            );
            if (existingProduct && quantity >= 1) {
                existingProduct.quantity = quantity; // Establecer cantidad a un valor específico
            }
        },
    },
});
export const {
    addToCart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
