import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: any;
    productId: number;
    productName: string;
    price: number;
    stock: number;
}

export interface ProductItem {
    index: number,
    item: Product
}

interface ProuctState {
    products: Product[] | null;
    product: Product | null;
}

const initialState: ProuctState = {
    products: null,
    product: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        updateProductItem: (state, action: PayloadAction<ProductItem>) => {
            if(state.products) {
                state.products[action.payload.index] = action.payload.item;
            }
        },
    },
});

export const { setProduct, updateProductItem } = productSlice.actions;
export default productSlice.reducer;