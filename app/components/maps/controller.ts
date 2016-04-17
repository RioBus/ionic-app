'use strict';
declare var plugin: any, google: any;

import { SERVER_ADDR } from '../../const';
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
    private map: any;
    private timer: any;
    private markers: Bus[];
    private markerList: any[] = [];
    
    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
    }
    
    private ngOnInit(): void {
        this.platform.ready().then(() => {
            this.map = plugin.google.maps.Map.getMap(document.getElementById("map_canvas"));
            this.map.addEventListener(plugin.google.maps.event.MAP_READY, () => {
                console.log("Map ready");
            });
        });
    }
    
    private ngOnDestroy(): void {
        console.log("Leaving map.");
        this.removeMarkers();
    }
    
    private isArray(value: any): boolean {
        return value instanceof Array;
    }
    
    public ngOnChanges(changes: any) {
        if(!changes.markers.previousValue && this.isArray(changes.markers.currentValue)) {
            // Just loaded the map view
            if(this.markerList.length>0) this.removeMarkers();
            this.insertNewMarkers(changes.markers.currentValue);
        } else if(this.isArray(changes.markers.previousValue) && this.isArray(changes.markers.currentValue)) {
            // Received new data
                if(JSON.stringify(changes.markers.previousValue)!==JSON.stringify(changes.markers.currentValue)) {
                    console.log("The data had an update.");
                } else console.log("Still no changes");
        }
    }
    
    private removeMarkers(): void {
        this.markerList.forEach((value, index) => {
            value.remove();
            delete this.markers[index];
        });
    }
    
    private addMarker(marker: any): void {
        this.markerList.push(marker);
    }
    
    private insertNewMarkers(buses: Bus[]): void {
        buses.forEach((bus: Bus) => {
            let location = new plugin.google.maps.LatLng(bus.Latitude, bus.Longitude);
            this.map.addMarker({
                position: location,
                title: bus.Line,
                icon: {
                    url: `${SERVER_ADDR}/images/bus_green.png`,
                    size: {
                        width: 40,
                        height: 47
                    }
                }
            }, (marker) => { this.addMarker(marker); });
        }, this);
    }
    
    private UpdateMarkers(buses: Bus[], previous: Bus[]): void {
        if(!previous && this.markers.length>0) {
            for(let i=0; i<this.markers.length; i++) {
                this.markerList[i].remove();
                delete this.markers[i];
            }
        }
    }
}