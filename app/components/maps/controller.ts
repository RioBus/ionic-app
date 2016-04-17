'use strict';
declare var plugin: any, google: any;

import { Modal, NavController, Platform } from 'ionic-angular';
import { Component } from 'angular2/core';

@Component({
    selector: 'google-maps',
    templateUrl: 'build/components/maps/template.html',
    inputs: [],
    directives: [],
})

export class GoogleMaps {
    
    private nav: NavController;
    private platform: Platform;
    private canvas: HTMLElement;
    private map: any;
    
    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
    }
    
    private ngOnInit(): void {
        this.platform.ready().then(() => { 
            this.canvas = document.getElementById("map_canvas");
            this.map = plugin.google.maps.Map.getMap(this.canvas);
            this.map.addEventListener(plugin.google.maps.event.MAP_READY, () => {
                console.log("Map ready");
            });
        });
    }
}