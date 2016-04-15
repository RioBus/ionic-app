'use strict';
declare var navigator: any;

import { Type }                    from 'angular2/core';
import { App, IonicApp, Platform } from 'ionic-angular';
import { MapPage }                 from './pages/map/page';
import { SearchPage }              from './pages/search/page';
import { MapManager }              from './managers/map';
import { ItineraryService }        from './services/itinerary';
import { SearchService }           from './services/search';

@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [MapManager, ItineraryService, SearchService]
})
export class Application {

  private rootPage: Type;
  private pages: Array<{title: string, component: Type}>;
  private app: IonicApp;
  private platform: Platform;
  private backPressed: boolean;

  constructor(app: IonicApp, platform: Platform) {
    this.app = app;
    this.platform = platform;
    this.rootPage = SearchPage; //HomePage;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Buscar', component: SearchPage },
      { title: 'Mapa', component: MapPage }
    ];
  }

  public openPage(page: any): void {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    this.app.getComponent('nav').setRoot(page.component);
  }
  
  private registerBackButton(): void {
      document.addEventListener('backbutton', () => {
        if (this.app.getComponent('nav').canGoBack()) {
          this.app.getComponent('nav').pop();
          return;
        }
        if(!this.backPressed) {
          this.backPressed = true;
          setTimeout(() => this.backPressed = false, 2000);
          return;
        }
        navigator.app.exitApp();
      }, false);
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      this.registerBackButton();
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
}
