/* eslint-disable max-len */
// https://github.com/wswebcreation/start-android-emulator
import { exec, execSync } from "child_process";

const log = (message: string | Error) => {
    console.log(`[android emulator] ${message}`);
};

const waitUntilBooted = (adbPath: string): Promise<void> => {
    return new Promise((resolve) => {
        const checkId = setInterval(() => {
            exec(`${adbPath} shell getprop init.svc.bootanim`, (_, stdout) => {
                if (stdout.replace("\n", "") === "stopped") {
                    clearInterval(checkId);
                    resolve();
                    log(`finished booting`);
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
        // @ts-ignore
        log(ex);
        // @ts-ignore
        const stderr = ex.stderr.toString();
        const forceReinstallRegex = /Package (.*) signatures do not/g;
        const match = forceReinstallRegex.exec(stderr);
        if (match && match[1]) {
            log(`Uninstalling ${match[1]} from device`);
            execSync(`${adbPath} uninstall ${match[1]}`, {
                stdio: "inherit"
            });

            log(`Attempting to reinstall ${filePath} on device`);
            execSync(`${adbPath} install -r ${filePath}`, {
                stdio: "inherit"
            });
        }
    }
};

export const runAndroidEmulator = async (
    adbPath: string,
    apkFilePath?: string,
    deviceOverride?: string
) => {
    const device = deviceOverride || getDevice();
    log(`Booting with ${device}`);
    const emulatorProcess = exec(
        `emulator -avd ${device} -netdelay none -netspeed full &`,
        (err, stdout, stderr) => {
            if (err) {
                throw err;
            }

            if (stderr) {
                throw new Error(stderr);
            } else {
                log(stdout);
                log("ran start emulator command successfully");
            }
        }
    );
    emulatorProcess.stdout?.pipe(process.stdout);

    await waitUntilBooted(adbPath);
    await wait(2000);

    if (apkFilePath) {
        installFile(adbPath, apkFilePath);
    }
};
