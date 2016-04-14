'use strict';
import { Page, Platform, NavController } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/search/template.html',
})
export class SearchPage {
    
    private platform: Platform;
    private nav: NavController;
    
    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
    }
}
