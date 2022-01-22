import { EmulatorContext } from "@storybook/native-types";
import AppetizeEmulatorController from "../controllers/AppetizeEmulatorController";
import EmulatorController from "../controllers/EmulatorController";
import LocalEmulatorController from "../controllers/LocalEmulatorController";

const getControllerQueryParam = (): string | undefined => {
    const urlParams = new URLSearchParams(window.location.search);
    const controller = urlParams.get("controller");
    if (!controller) {
        return undefined;
    }

    return controller;
};

export const getNewController = (
    context?: EmulatorContext
): EmulatorController => {
    if (process.env.STORYBOOK_NATIVE_LOCAL_EMULATOR) {
        return new LocalEmulatorController(context);
    }

    const controllerOverride = getControllerQueryParam();
    if (controllerOverride === "local") {
        return new LocalEmulatorController(context);
    }

    return new AppetizeEmulatorController(context);
};
