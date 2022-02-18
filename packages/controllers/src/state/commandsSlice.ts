import axios from "axios";
import type { HandledMessageResponse } from "../types";
import { ActionTypes } from "../constants";
import type { AppDispatch, ThunkActionHandler } from "./store";

const getServerUrl = () => {
    // Dev environment, so the dev middleware is run by the Storybook server
    if (window.location.hostname.includes("localhost")) {
        return window.location.origin;
    }

    // Prod environment, so the dev middleware is run by the user on port 3000
    return `http://localhost:3000`;
};

export const performCommand = (
    path: string,
    data: Record<string, any>
): ThunkActionHandler => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.PERFORM_COMMAND });

        try {
            const url = getServerUrl() + path;
            const response = await axios.post(url, data);
            const details: HandledMessageResponse = {
                message: data,
                response: response.data.message,
                successful: true
            };

            dispatch({ type: ActionTypes.COMMAND_SUCCESS, payload: details });
        } catch (ex) {
            console.error(ex);
            const details: HandledMessageResponse = {
                message: data,
                // @ts-ignore
                response: ex.response?.data?.message,
                successful: false
            };

            dispatch({ type: ActionTypes.COMMAND_ERROR, payload: details });
        }
    };
};

export const resetCommands = (dispatch: AppDispatch) => {
    dispatch({
        type: ActionTypes.RESET_COMMANDS
    });
};
