/* eslint-disable max-len */
// https://github.com/wswebcreation/start-android-emulator
import { exec, execSync } from "child_process";
import path from "path";
import { downloadFile } from "./downloadFile";

const waitUntilBooted = (adbPath: string): Promise<void> => {
    return new Promise((resolve) => {
        const checkId = setInterval(() => {
            exec(`${adbPath} shell getprop init.svc.bootanim`, (_, stdout) => {
                if (stdout.replace("\n", "") === "stopped") {
                    clearInterval(checkId);
                    resolve();
                }
            });
        }, 500);
    });
};

const wait = (time: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

const getDevice = (): string => {
    const devices = execSync("emulator -list-avds")
        .toString()
        .trim()
        .split("\n");

    return devices[0];
};

const installFile = (adbPath: string, filePath: string) => {
    try {
        execSync(`${adbPath} install -t -r ${filePath}`);
    } catch (ex) {
        console.error(ex);
        const stderr = ex.stderr.toString();
        const forceReinstallRegex = /Package (.*) signatures do not/g;
        const match = forceReinstallRegex.exec(stderr);
        if (match && match[1]) {
            console.log(`Uninstalling ${match[1]} from device`);
            execSync(`${adbPath} uninstall ${match[1]}`, {
                stdio: "inherit"
            });

            console.log(`Attempting to reinstall ${filePath} on device`);
            execSync(`${adbPath} install -r ${filePath}`, {
                stdio: "inherit"
            });
        }
    }
};

export const runAndroidEmulator = async (adbPath: string, apkUrl: string) => {
    const device = getDevice();
    console.log(`[android emulator] Booting with ${device}`);
    const emulatorProcess = exec(
        `emulator -avd ${device} -netdelay none -netspeed full &`,
        (err) => {
            if (err) {
                throw err;
            }

            console.log("ran start emulator command successfully");
        }
    );
    emulatorProcess.stdout?.pipe(process.stdout);

    // TODO: URLs that require authentication
    const isWebUrl = apkUrl.startsWith("http");
    const apkFilePath = isWebUrl
        ? path.join(process.cwd(), "tempAppFile.apk")
        : apkUrl;
    if (isWebUrl) {
        await downloadFile(apkUrl, apkFilePath);
    }

    await waitUntilBooted(adbPath);
    await wait(2000);

    installFile(adbPath, apkFilePath);
    /* execSync(
        `cd ../../examples/controls && export STORYBOOK_NATIVE_LOCAL_EMULATOR="true" && yarn start`,
        {
            stdio: "inherit"
        }
    ); */
    /* execSync(
        `export STORYBOOK_NATIVE_LOCAL_EMULATOR="true" && yarn start`,
        {
            stdio: "inherit"
        }
    ); */
};
