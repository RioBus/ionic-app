# Rio Bus Ionic app

## Install & Start

```bash
git clone https://github.com/fmsouza/riobus-ionic.git
cd riobus-ionic
npm install       # or `npm run reinstall` if you get an error
npm start         # start the application (ionic serve)
```

## Run Unit Tests
```bash
npm test          # run unit tests
```

## Debug Unit tests
```bash
npm run test.watch   # in one window - build all the tests and start watching for changes
npm run karma        # start karma in debug mode: mutli run Chrome, hit `debug` to get going
```

## Run E2E
```
# e2e (aka. end-to-end, integration) - In two different shell windows
# Make sure you don't have a global instance of Protractor

# npm run webdriver-update <- You will need to run this the first time
npm start
npm run e2e
```

## Blog Topics

* [Unit testing walkthrough](http://lathonez.com/2016/ionic-2-unit-testing/)
* [E2E testing walkthrough](http://lathonez.com/2016/ionic-2-e2e-testing/)
* [Removing assets from the APK](http://lathonez.com/2016/cordova-remove-assets/)

## Contribute
Issues and PRs are welcome, see the [issues list](https://github.com/fmsouza/ionic2-blank/issues)

## Acks

* This project is essentially a fork of [@lathonez's clicker](https://github.com/lathonez/clicker) and would not be possible without it
* @ric9176 and @DanielaGSB for E2E tests (#50)
