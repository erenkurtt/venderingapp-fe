import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface System {
    id: any;
    systemId: number;
    balance: number;
    temperature: number;
}

interface SystemState {
    system: System | null;
    supplierMode: boolean;
    protectionMode:boolean;
}

const initialState: SystemState = {
    system: null,
    supplierMode: false,
    protectionMode: false
};

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setSystem: (state, action: PayloadAction<System>) => {
            state.system = action.payload;
        },
        setTemperature: (state, action: PayloadAction<number>) => {
            if(state.system) {
                state.system.temperature = action.payload;
            }
        },
        setBalance: (state, action: PayloadAction<number>) => {
            if(state.system) {
                state.system.balance = action.payload;
            }
        },
        setSupplierMode: (state, action: PayloadAction<boolean>) => {
            state.supplierMode = action.payload;
        },
        setProtectionMode: (state, action: PayloadAction<boolean>) => {
            state.protectionMode = action.payload;
        },
    },
});

export const { setSystem, setTemperature, setBalance, setSupplierMode, setProtectionMode } = systemSlice.actions;
export default systemSlice.reducer;