import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Process {
    id: any;
    processId: String;
    payment: number;
    status: String;
}

interface ProcessState {
    process: Process | null;
}

const initialState: ProcessState = {
    process: null,
};

const processSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        setProcess: (state, action: PayloadAction<Process>) => {
            state.process = action.payload;
        },
        updateDeposit: (state, action: PayloadAction<number>) => {
            if(state.process) {
                state.process.payment = action.payload;
            }
        },
        updateStatus: (state, action: PayloadAction<String>) => {
            if(state.process) {
                state.process.status = action.payload;
            }
        },
    },
});

export const { setProcess, updateDeposit, updateStatus } = processSlice.actions;
export default processSlice.reducer;