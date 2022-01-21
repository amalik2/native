const path = require("path");
const { runApp } = require("./dist/index");

const middlewarePath = path.join(process.cwd(), ".storybook", "middleware.js");
const middleware = require(middlewarePath);
runApp(middleware);
