import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: { receivedMail: [], sentMail: [], viewMail: false },
    reducers: {
        updateReceiverMail(state, action) {
            state.receivedMail = action.payload.mail
        },
        updateSentMail(state, action) {
          state.sentMail = action.payload.mail
        },
        viewMailHandle(state, action) {
            const newId = action.payload.id;
            const index = state.receivedMail.findIndex((mail)=> mail.id === newId);
            state.receivedMail[index].isRead = true;
            state.viewMail = !state.viewMail;
        },
        mailHandler(state) {
            state.viewMail = !state.viewMail;
        },
        deleteReceivedMail(state, action) {
            const id = action.payload.id;
            state.receivedMail = state.receivedMail.filter((mail) => mail.id !== id);
            state.viewMail = !state.viewMail;
        },
        deleteSentMail(state, action) {
            const id = action.payload.id;
            state.sentMail = state.sentMail.filter((mail) => mail.id !== id);
            state.viewMail = !state.viewMail;
        }
    }
})

export const mailActions = mailSlice.actions;

export default mailSlice;