const { runAndroidEmulator } = require("./dist/index");
runAndroidEmulator("adb", process.argv[2]);
