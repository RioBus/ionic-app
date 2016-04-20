'use strict';
declare var navigator: any;

import { URL_PLAY_STORE, URL_FB_PAGE } from './const';
import { Type }                        from 'angular2/core';
import { App, IonicApp, Platform }     from 'ionic-angular';
import { AboutPage }                   from './pages/about/page';
import { FavoritesPage }               from './pages/favorites/page';
import { MapPage }                     from './pages/map/page';
import { SearchPage }                  from './pages/search/page';
import { ItineraryService }            from './services/itinerary';
import { SearchService }               from './services/search';

@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [ItineraryService, SearchService]
})
export class Application {

  private rootPage: Type;
  private pages: Array<{title: string, icon: string, component?: Type, link?: string}>;
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
      { title: 'Pesquisar', icon: 'search', component: SearchPage },
      { title: 'Favoritos', icon: 'star', component: FavoritesPage },
      { title: 'Histórico', icon: 'time' },
      { title: 'Sobre', icon: 'help-circle', component: AboutPage },
      { title: 'Avalie o app', icon: 'appstore', link: URL_PLAY_STORE },
      { title: 'Curta no Facebook', icon: 'thumbs-up', link: URL_FB_PAGE }
    ];
  }

  public openPage(page: {title: string, icon: string, component?: Type, link?: string}): void {
    if(page.component) {
      // close the menu when clicking a link from the menu
      this.app.getComponent('leftMenu').close();
      // navigate to the new page if it is not the current page
      this.app.getComponent('nav').setRoot(page.component);
    } else if(page.link) {
      window.open(page.link, '_system');
    }
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
    });
  }
}
