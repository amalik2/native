/* eslint-disable max-len */
import { execSync } from "child_process";
import path from "path";
import { downloadFile } from "./downloadFile";

const installFile = (device: string, filePath: string) => {
    execSync(`yarn ios-sim install ${filePath} -d ${device}`, {
        stdio: "inherit"
    });
};

const exit = () => {
    execSync(`xcrun simctl shutdown all`, {
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

export const runIosEmulator = async (appUrl: string) => {
    const device = "iPhone-12";
    boot(device);

    // TODO: URLs that require authentication
    const isWebUrl = appUrl.startsWith("http");
    const appFilePath = isWebUrl
        ? path.join(process.cwd(), "tempAppFile.app")
        : appUrl;
    if (isWebUrl) {
        await downloadFile(appUrl, appFilePath);
    }

    installFile(device, appFilePath);
};
