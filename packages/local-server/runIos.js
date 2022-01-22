const { runIosEmulator } = require("./dist/index");
runIosEmulator(process.argv[2], process.argv[3]).catch((err) => {
    console.error(err);
    process.exit(1);
});
require("./runServer");
