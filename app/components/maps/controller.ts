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
    private markerList: any = {};
    
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
    
    public ngOnChanges(changes: any) {
        if(!changes.markers.previousValue && this.isArray(changes.markers.currentValue)) {
            // Just loaded the map view
            if(Object.keys(this.markerList).length>0) this.removeMarkers();
            this.insertNewMarkers(changes.markers.currentValue);
        } else if(this.isArray(changes.markers.previousValue) && this.isArray(changes.markers.currentValue)) {
            // Received new data
            if(JSON.stringify(changes.markers.previousValue)!==JSON.stringify(changes.markers.currentValue)) {
                this.UpdateMarkers(changes.markers.currentValue);
            } else console.log("Still no changes");
        }
    }
    
    private isArray(value: any): boolean {
        return value instanceof Array;
    }
    
    private removeMarkers(): void {
        Object.keys(this.markerList).forEach((key: string) => {
            this.markerList[key].remove();
            delete this.markerList[key];
        });
    }
    
    private addMarker(key:string, marker: any): void {
        this.markerList[key] = marker;
    }
    
    private insertNewMarkers(buses: Bus[]): void {
        let positions: any = [];
        buses.forEach((bus: Bus, index: number) => {
            let location = new plugin.google.maps.LatLng(bus.Latitude, bus.Longitude);
            this.map.addMarker({
                position: location,
                title: bus.Line,
                icon: {
                    url: `www/img/bus_green.png`,
                    size: {
                        width: 40,
                        height: 47
                    }
                }
            }, (marker) => {
                this.addMarker(bus.Order, marker);
                positions.push(location);
                if(index===buses.length-1) this.fitBounds(positions);
            });
        }, this);
    }
    
    private fitBounds(points: any[]): void {
        let bounds = new plugin.google.maps.LatLngBounds(points);
        this.map.animateCamera({ 'target' : bounds });
    }
    
    private UpdateMarkers(current: Bus[]): void {
        current.forEach((bus: Bus)=> {
            let marker = this.markerList[bus.Order];
            if(!marker) {
                this.map.addMarker({
                    position: new plugin.google.maps.LatLng(bus.Latitude, bus.Longitude),
                    title: bus.Line,
                    icon: {
                        url: `www/img/bus_green.png`,
                        size: {
                            width: 40,
                            height: 47
                        }
                    }
                }, (marker) => {
                    this.addMarker(bus.Order, marker);
                });
            } else {
                let newPosition = new plugin.google.maps.LatLng(bus.Latitude, bus.Longitude);
                marker.setPosition(newPosition);
            }
        });
    }
}