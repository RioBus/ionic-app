# Rio Bus hybrid android app

## Install & Start

### Install Node.js
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash # Mac or linux, follow the instructions
nvm install stable
```

### Prepare the application environment
```bash
npm install -g ionic@beta cordova gulp
git clone https://github.com/riobus/ionic.git
cd ionic
npm install       # or `npm run reinstall` if you get an error
npm start         # start the application (ionic serve)
```

### Run
```bash
npm start               # start the application in the browser (ionic serve)
npm run android         # deploy the app to the connected device (ionic run android)
ionic emulate android   # deploy the app to an emulator 
```

Running as root? You probably shouldn't be. If you need to: `npm run postinstall` before `npm start`. [#111](https://github.com/lathonez/clicker/issues/111) for more info.

## Run Unit Tests
```bash
npm test          # run unit tests
```

## Debug Unit tests
```bash
npm run karma    # start karma in debug mode: multi run Chrome, hit `debug` to get going.
```

## Run E2E
```
# e2e (aka. end-to-end, integration) - In two different shell windows
# Make sure you don't have a global instance of Protractor

npm start
npm run e2e
```

## Blog Topics

* [Unit testing walkthrough](http://lathonez.com/2016/ionic-2-unit-testing/)
* [E2E testing walkthrough](http://lathonez.com/2016/ionic-2-e2e-testing/)
* [Removing assets from the APK](http://lathonez.com/2016/cordova-remove-assets/)
* [Unifying DI Boilerplate](http://lathonez.com/2016/unify-di-boilerplate/)

## Contribute
Issues and PRs are welcome, see the [issues list](https://github.com/riobus/ionic/issues)

## Acks

* This project started from [@fmosuza's ionic2 seed](https://github.com/fmsouza/ionic2-blank)

## Changelog

See the changelog [here](https://github.com/riobus/ionic/blob/master/CHANGELOG.md)

## Main dependencies

* **@Angular:** 2.0.0-rc.4
* **Ionic:** 2.0.0-beta.11

External dependencies are listed here to justify their inclusion and to allow for their removal if your project isn't using the related functionality.

* browserify: peer dependency of karma-browserify
* browserify-istanbul: coverage transformer for karma-browserify
* codecov.io: sending unit test coverage reports to codecov.io
* gulp-tslint: access tslint from gulp
* gulp-typescript: transpile typescript in gulp
* isparta: ES6 unit test coverage reporter
* jasmine-core: jasmine coverage reporter
* jasmine-spec-reporter: e2e coverage reporter for jasmine
* karma: unit test runner
* karma-browserify: transpile and bundle typescript in Karma
* karma-chrome-launcher: allows using chrome with Karma - chrome is used in Travis
* karma-coverage: unit test coverage reporter
* karma-jasmine: jasmine framework for Karma
* karma-mocha-reporter: mocha progress reporter for Karma
* karma-phantomjs-launcher: allows using phantom with Karma
* phantomjs-prebuilt: phantom headless browser
* protractor: e2e test runner
* protractor-jasmine2-screenshot-reporter: screenshot reporter for Jasmine
* tsify: typescript plugin for karma-browserify
* ts-node: transpile gulpfile
* tslint: static code analysis for typescript
* tslint-eslint-rules: eslint rules plugin for tslint
* typescript: transpile e2e tests
* typings: type definitions manager
