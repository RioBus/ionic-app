'use strict';
declare var navigator: any;

import { URL_PLAY_STORE, URL_FB_PAGE }             from './const';
import { Type }                                    from 'angular2/core';
import { App, IonicApp, MenuController, Platform } from 'ionic-angular';
import { SearchService }                           from './services/search';
import { AboutPage }                               from './pages/about/page';
import { SearchPage }                              from './pages/search/page';
import { HistoryPage }                             from './pages/history/page';
import { ItineraryService }                        from './services/itinerary';
import { FavoritesPage }                           from './pages/favorites/page';

// App decorator: http://ionicframework.com/docs/v2/api/decorators/App/
@App({
  templateUrl: 'build/app.html',
  providers: [ItineraryService, SearchService],
  prodMode: true,
  config: {},
})
export class Application {

  private rootPage: Type;
  private pages: Array<{ title: string, icon: string, component?: Type, link?: string }>;
  private app: IonicApp;
  private menu: MenuController;
  private platform: Platform;
  private backPressed: boolean;

  constructor(app: IonicApp, platform: Platform, menu: MenuController) {
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.rootPage = SearchPage;

    // set our app's pages
    this.pages = [
      { title: 'Favoritos', icon: 'star', component: FavoritesPage },
      { title: 'Histórico', icon: 'time', component: HistoryPage },
      { title: 'Sobre', icon: 'help-circle', component: AboutPage },
      { title: 'Avalie o app', icon: 'appstore', link: URL_PLAY_STORE },
      { title: 'Curta no Facebook', icon: 'thumbs-up', link: URL_FB_PAGE }
    ];

    this.initializeApp();
  }

  public openPage(page: { title: string, icon: string, component?: Type, link?: string }): void {
    if (page.component) {
      // close the menu when clicking a link from the menu
      this.menu.close();
      // navigate to the new page if it is not the current page
      this.app.getComponent('nav').push(page.component);
    } else if (page.link) {
      window.open(page.link, '_system');
    }
  }

  private initializeApp(): void {
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {
    document.addEventListener('backbutton', () => this.handleBackButton(), false);
  }

  private handleBackButton(): void {
    if (this.app.getComponent('nav').canGoBack()) {
      this.app.getComponent('nav').pop();
      return;
    }
    if (!this.backPressed) {
      this.backPressed = true;
      setTimeout(() => this.backPressed = false, 2000);
      return;
    }
    navigator.app.exitApp();
  }
}
