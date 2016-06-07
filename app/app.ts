'use strict';

import { Type, ViewChild }    from '@angular/core';
import { App, Platform, Nav } from 'ionic-angular';
import { StatusBar }          from 'ionic-native';
import { HomePage }           from './pages/home/page';

/**
 * Bootstraps the Ionic app 
 * 
 * @class {Application}
 */
@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  prodMode: false, // toggles Angular2 production mode on/off
})
export class Application {

  @ViewChild(Nav) private nav: Nav;

  private rootPage: Type;
  private pages: Array<{title: string, component: Type}>;
  private platform: Platform;

  public constructor(platform: Platform) {
    this.platform = platform;
    this.rootPage = HomePage;
    this.platform.ready().then(() => this.onReady());

  }

  /**
   * When the cordova platform is ready, it configures the environment
   * @return {void}
   */
  private onReady(): void {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.hideSplashScreen();
      StatusBar.styleDefault();
      this.configureMenu();
  }

  /**
   * Hides the splashscreen right when the app is ready.
   * @return {void}
   */
  private hideSplashScreen(): void {
      if (navigator && navigator.splashscreen) {
          setTimeout(() => navigator.splashscreen.hide(), 100);
      }
  }

  /**
   * Configures menu links
   * @return {void}
   */
  private configureMenu(): void {
    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
  }

  public openPage(page: {title: string, component: Type}): void {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
