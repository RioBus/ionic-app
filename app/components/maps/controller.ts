'use strict';
declare var plugin: any, google: any;

import { Modal, NavController, Platform } from 'ionic-angular';
import { Component, OnChanges } from 'angular2/core';
import { Bus } from '../../models/bus';

@Component({
    selector: 'google-maps',
    templateUrl: 'build/components/maps/template.html',
    inputs: ['markers: markers'],
    directives: [],
})

export class GoogleMaps implements OnChanges {
    
    private nav: NavController;
    private platform: Platform;
    private canvas: HTMLElement;
    private map: any;
    private timer: any;
    
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
    
    ngOnChanges(changes: any) {
        if(changes.markers) {
            if(changes.markers.previousValue)
                console.log(`Previous markers: ${changes.markers.previousValue.length}`);
            if(changes.markers.currentValue)
                console.log(`Current markers: ${changes.markers.currentValue.length}`);
        }
    }
}