'use strict';

import { Type, ViewChild }                    from '@angular/core';
import { App, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar }                          from 'ionic-native';
import { HomePage } from './pages/home/page';

@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
})
export class Application {

  @ViewChild(Nav) private nav: Nav;

  private rootPage: Type;
  private pages: Array<{title: string, component: Type}>;
  private menu: MenuController;
  private platform: Platform;

  constructor(platform: Platform, menu: MenuController) {

    this.platform = platform;
    this.menu = menu;

    this.rootPage = HomePage;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  public openPage(page: any): void {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  };
}
