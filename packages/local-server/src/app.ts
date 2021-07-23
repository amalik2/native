import express from "express";
import {
    middleware,
    NativeDevMiddlewareConfig
} from "@storybook/native-dev-middleware";

export const runApp = (
    middlewareConfig: NativeDevMiddlewareConfig,
    port = 3000
) => {
    const app = express();
    middleware(middlewareConfig)(app);

    app.listen(port, () => {
        console.log(
            `Storybook native local app listening at http://localhost:${port}`
        );
    });
};
