'use strict';
declare var plugin: any;
import { Page, Platform, NavController } from 'ionic-angular';
import { SearchPage } from '../search/page';

@Page({
  templateUrl: 'build/pages/home/template.html',
})
export class HomePage {
    
    private canvas: Element;
    private map: any;
    private platform: Platform;
    private nav: NavController;
    
    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        this.initializePage();
    }
    
    private initializePage(): void {
        this.platform.ready().then(() => {
            this.canvas = document.getElementById("map_canvas");
            this.map = plugin.google.maps.Map.getMap(this.canvas);
            this.map.addEventListener(plugin.google.maps.event.MAP_READY, () => {
                console.log("Map ready");
            });
        });
    }
    
    public openSearch(): void {
        this.nav.push(SearchPage);
    }
}
