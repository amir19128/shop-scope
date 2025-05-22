/**
 * selectedProductsSlice
 * 
 * Redux slice for managing the list of products selected by the user.
 * Includes actions to add and remove products from the selection.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
}

interface SelectedProductsState {
    items: Product[];
}

const initialState: SelectedProductsState = {
    items: [],
};

const selectedProductsSlice = createSlice({
    name: 'selectedProducts',
    initialState,
    reducers: {
        // Add product to selected list (if not already selected)
        addProduct: (state, action: PayloadAction<Product>) => {
            const exists = state.items.find((p) => p.id === action.payload.id);
            if (!exists) state.items.push(action.payload);
        },
        // Remove product by ID
        removeProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((p) => p.id !== action.payload);
        },
    },
});

export const { addProduct, removeProduct } = selectedProductsSlice.actions;
export default selectedProductsSlice.reducer;
