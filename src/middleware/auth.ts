import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userApi } from "../app/services/userApi";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: userApi.endpoints.login.matchFulfilled,
    effect: async (isAction, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if(isAction.payload.token){
            localStorage.setItem('token', isAction.payload.token)
        }
    }
})