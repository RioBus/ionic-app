'use strict';
declare var plugin: any;
import { Page, Platform } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/template.html',
})
export class HomePage {
    
    private canvas: Element;
    private map: any;
    private platform: Platform;
    
    constructor(platform: Platform) {
        this.platform = platform;
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
        console.log("Ready to open the search view");
    }
}
