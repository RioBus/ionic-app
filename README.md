# Rio Bus hybrid android app

This is the RioBus' geolocation app built with Ionic2 + TypeScript + Karma + Protractor.

## Table of Contents
 - [Install Node.js](#install-nodejs)
 - [Getting Started](#getting-started)
 - [Run in browser](#run-in-browser)
 - [Run in Android](#run-in-android)
 - [Run in iOS](#run-in-ios)
 - [Run Unit Tests](#run-unit-tests)
 - [Run E2E](#run-e2e)
 - [Contribute](#contribute)
 - [Acknowledges](#acknowledges)

## Install Node.js
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash # Mac or linux, follow the instructions
nvm install stable
```

## Getting Started

* Clone this repository.
* Install the ionic CLI and Cordova CLI (`npm install -g ionic cordova`)
* Run `npm install` from the project root.
* Run `npm start` in a terminal from the project root.
* Profit.

**Note:** Is your build slow? Update `npm` to 3.x: `npm install -g npm`.

## Run in browser
```bash
npm start         # deploys the the browser
```

## Run in Android
```bash
# make sure the Android device is connected and available to ADB

npm run android   # deploys the app to an Android device
```

## Run in iOS
```bash
# make sure the iOS device is connected

npm run ios       # deploys the app to an iOS device
```

## Run Unit Tests
```bash
npm test          # run unit tests
```

## Run E2E
```bash
# e2e (aka. end-to-end, integration) - In two different shell windows
# Make sure you don't have a global instance of Protractor

npm start
npm run e2e
```

## Contribute
Issues and PRs are welcome, see the [issues list](https://github.com/riobus/ionic/issues).

## Acknowledges

* This project started from [@fmosuza's ionic2 seed](https://github.com/fmsouza/ionic2-seed)
