const { runApp } = require("./dist/index");
const { middleware } = require("@storybook/native-dev-middleware");
runApp(middleware());
