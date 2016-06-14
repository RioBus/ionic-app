'use strict';

import { Component, Type, ViewChild }    from '@angular/core';
import { Platform, ionicBootstrap, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen }       from 'ionic-native';
import { HomePage }                      from './pages/home/page';
import { BasePage }                      from './core/page';

// Application providers
const providers: any[] = [];

// Application config
// http://ionicframework.com/docs/v2/api/config/Config/
const config: any = {
  prodMode: false,
};

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
@Component({
  templateUrl: 'build/app.html',
})
export class Application extends BasePage {

  @ViewChild(Nav) private nav: Nav;

  private rootPage: Type;
  private pages: MenuItem[];
  private platform: Platform;

  public constructor(platform: Platform) {
    super();
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
          { title: this.Text.MENU_OPTION_HOME, icon: 'home', component: HomePage, home: true },
    ];
  }

  /**
   * Hides the splashscreen right when the app is ready.
   * @return {void}
   */
  private hideSplashScreen(): void {
      setTimeout(() => Splashscreen.hide(), 100);
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

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument
ionicBootstrap(Application, providers, config);
