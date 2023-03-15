import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: { receivedMail: [], sentMail: []},
    reducers: {
        updateReceiverMail(state, action) {
            state.receivedMail = action.payload.mail
        }
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice;