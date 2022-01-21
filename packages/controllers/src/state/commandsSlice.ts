import axios from "axios";
import type { HandledMessageResponse } from "../types";
import { ActionTypes } from "../constants";
import type { AppDispatch, ThunkActionHandler } from "./store";

const getServerBaseUrl = () => {
    return `http://localhost:3000`;

    console.error(window.location.origin);
    console.error(window.location.origin.includes("localhost"));
    if (window.location.origin.includes("localhost")) {
        return window.location.origin;
    }

    // TODO: make this configurable
    return `http://localhost:3000`;
};

export const performCommand = (
    urlPath: string,
    data: Record<string, any>
): ThunkActionHandler => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.PERFORM_COMMAND });

        try {
            const baseUrl = getServerBaseUrl();

            const response = await axios.post(baseUrl + urlPath, data);
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
