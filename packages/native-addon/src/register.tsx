import React from "react";
import { addons, types } from "@storybook/addons";
import { Icons, IconButton } from "@storybook/components";
import { sendMessage } from "@storybook/appetize-utils";
import { DeepLinksContainer } from "@storybook/deep-link-logger";

import { ADDON_ID, DEEP_LINKS_PARAM_KEY } from "./constants";
import DeviceSelector from "./components/DeviceSelector";

const rotateLeft = () => {
    sendMessage("rotateLeft");
};

const rotateRight = () => {
    sendMessage("rotateRight");
};

const captureScreenshot = () => {
    sendMessage("saveScreenshot");
};

addons.register(ADDON_ID, (api) => {
    addons.add(`${ADDON_ID}/rotateLeft`, {
        type: types.TOOL,
        title: "Rotate left",
        render: () => (
            <IconButton title="Rotate left" onClick={rotateLeft}>
                <Icons icon="arrowleft" />
            </IconButton>
        )
    });

    addons.add(`${ADDON_ID}/rotateRight`, {
        type: types.TOOL,
        title: "Rotate right",
        render: () => (
            <IconButton title="Rotate right" onClick={rotateRight}>
                <Icons icon="arrowright" />
            </IconButton>
        )
    });

    addons.add(`${ADDON_ID}/captureScreenshot`, {
        type: types.TOOL,
        title: "Capture screenshot",
        render: () => (
            <IconButton title="Capture screenshot" onClick={captureScreenshot}>
                <Icons icon="camera" />
            </IconButton>
        )
    });

    addons.add(`${ADDON_ID}/devicePicker`, {
        type: types.TOOL,
        title: "Select device",
        render: () => <DeviceSelector />
    });

    addons.add(`${ADDON_ID}/deepLinks/panel`, {
        title: "Deep links",
        type: types.PANEL,
        render: ({ active, key }) => (
            <DeepLinksContainer key={key} api={api} active={active} />
        ),
        paramKey: DEEP_LINKS_PARAM_KEY
    });
});
