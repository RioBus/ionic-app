'use strict';
declare var plugin: any;
import { Page, Platform } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/template.html',
})
export class HomePage {
    
    private static canvas: any;
    private static map: any;
    private platform: Platform;
    
    constructor(platform: Platform) {
        this.platform = platform;
        this.initializePage();
    }
    
    private initializePage(): void {
        this.platform.ready().then(() => {
            let div: Element = document.getElementById("map_canvas");
            let map: Element = plugin.google.maps.Map.getMap(div);
            map.addEventListener(plugin.google.maps.event.MAP_READY, () => {
                console.log("Map ready");
            });
        });
    }
}
