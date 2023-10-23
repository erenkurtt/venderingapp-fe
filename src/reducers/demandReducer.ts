import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Demand {
    id: any;
    demandId: String
    productId: number;
    count: number;
    price: number;
}


interface DemandState {
    demands: Demand[] | null;
}

const initialState: DemandState = {
    demands: null,
};

const demandSlice = createSlice({
    name: 'demands',
    initialState,
    reducers: {
        setDemands: (state, action: PayloadAction<Demand[]>) => {
            state.demands = action.payload;
        },
    },
});

export const { setDemands } = demandSlice.actions;
export default demandSlice.reducer;