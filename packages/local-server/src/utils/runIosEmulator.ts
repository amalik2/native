/* eslint-disable max-len */
import { execSync } from "child_process";

const installFile = (device: string, filePath: string) => {
    execSync(`yarn ios-sim install ${filePath} -d ${device}`, {
        stdio: "inherit"
    });
};

const boot = (device: string) => {
    execSync(`yarn ios-sim start -d ${device}`, {
        stdio: "inherit"
    });
    // TODO: fix Error: Command failed: xcrun simctl shutdown all due to SIGINT
    /* process.on("exit", () => {
        exit();
    });
    process.on('SIGINT', () => {
        exit();
    }); */
};

export const runIosEmulator = async (appUrl?: string, device = "iPhone-12") => {
    boot(device);
    if (appUrl) {
        installFile(device, appUrl);
    }
};
