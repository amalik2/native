# @storybook/native-local-server

This package installs an APK or APP file onto the Android or iOS emulator on your local machine, and starts a server that lets you control the emulator by interacting with a static storybook hosted on a website.

## Installation
`npm install @storybook/native-local-server`
or
`yarn add @storybook/native-local-server`

## Pre-requisites

#### Android
Ensure the android SDK directory is set in your $PATH

```sh
export ANDROID_SDK=$HOME/Library/Android/sdk
export PATH=$ANDROID_SDK/emulator:$ANDROID_SDK/tools:$PATH
```

## Usage

Download or create an APK file (on Android) or an APP file (on iOS) for the app you want to run. Details on how these files are created can be found [here](https://docs.appetize.io/core-features/uploading-apps)

#### Android
`npm run native-android-app PATH_TO_APK`
or
`yarn native-android-app PATH_TO_APK`

#### iOS
`npm run native-ios-app PATH_TO_APP`
or
`yarn native-ios-app PATH_TO_APP`

After running one of the above commands, navigate to the static storybook site and begin interacting with it. The emulator open on your local machine will update as you interact with storybook in your browser.
