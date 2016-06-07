'use strict';

import { Type, ViewChild }    from '@angular/core';
import { App, Platform, Nav } from 'ionic-angular';
import { StatusBar }          from 'ionic-native';
import { HomePage }           from './pages/home/page';

interface MenuItem {
  title: string;
  icon: string;
  component?: Type;
  link?: string;
  action?: Function;
  home?: boolean;
}

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
  private pages: MenuItem[];
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
   * Configures menu links
   * @return {void}
   */
  private configureMenu(): void {
    // set our app's pages
    this.pages = [
          { title: 'Home', icon: 'home', component: HomePage, home: true },
    ];
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
   * Opens a given page
   * @param {MenuItem} page - Clicked page item
   * @return {void}
   */
  public openPage(page: MenuItem): void {
      if (page.component) {
          if (!page.home) this.nav.push(page.component);
          else this.rootPage = page.component;
      }
      else if (page.link) window.open(page.link, '_system');
      else if (page.action) page.action();
  }
}
