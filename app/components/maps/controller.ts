'use strict';
declare var plugin: any, google: any;

import { SERVER_ADDR } from '../../const';
import { Modal, NavController, Platform, Button, Icon } from 'ionic-angular';
import { MapSnackbar } from '../map-snackbar/controller';
import { Component, OnChanges } from 'angular2/core';
import { Bus } from '../../models/bus';
import { Line } from '../../models/itinerary';
import { MarkerController } from './marker';

let markerIcons: any = {
    good: 'www/img/bus_green.png',
    average: 'www/img/bus_yellow.png',
    bad: 'www/img/bus_red.png'
};

@Component({
    selector: 'google-maps',
    templateUrl: 'build/components/maps/template.html',
    inputs: ['markers', 'line'],
    directives: [MapSnackbar],
})
export class GoogleMaps implements OnChanges {
    
    private static markerList: any = {};
    private nav: NavController;
    private platform: Platform;
    private map: any;
    private timer: any;
    private markers: Bus[];
    private line: Line;
    private mcontrol: MarkerController;
    private swap: boolean = false;
    private static instance: GoogleMaps;
    
    public get Line(): Line {
        return this.line;
    }
    
    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        GoogleMaps.instance = this;
    }
    
    private static getInstance(): GoogleMaps {
        return GoogleMaps.instance;
    }
    
    private isArray(value: any): boolean {
        return value instanceof Array;
    }
    
    private ngOnInit(): void {
        this.platform.ready().then(() => { this.onPlatformRedy(); });
    }
    
    private ngOnDestroy(): void {
        this.removeMarkers();
    }
    
    public ngOnChanges(changes: any): void {
        this.checkMarkerChanges(changes.markers);
    }
    
    private onPlatformRedy(): void {
        // Map centered in RJ
        this.map = plugin.google.maps.Map.getMap(document.getElementById("map_canvas"), {
            mapType: plugin.google.maps.MapTypeId.ROADMAP,
            controls: { compass: true, myLocationButton: true, indoorPicker: false, zoom: false },
            camera: { latLng: new plugin.google.maps.LatLng(-22.9083, -43.1964), zoom: 12 }
        });
        this.mcontrol = new MarkerController(this.map);
        this.map.addEventListener(plugin.google.maps.event.MAP_READY, () => { this.onMapReady(); });
    }
    
    private onMapReady(): void {
        console.log("Map ready");
    }
    
    public onSwapDirection(): boolean {
        let self = GoogleMaps.getInstance();
        if(self.Line.Description !== 'desconhecido') {
            self.swap = !self.swap;
            self.removeMarkers();
            self.updateMarkers(self.markers);
            return true;
        }
        return false;
    }
    
    private updateMarkers(current: Bus[]): void {
        this.filterBuses(current).forEach( bus => {
            this.mcontrol.setMarker(bus);
        });
    }
    
    private removeMarkers(): void {
        this.mcontrol.removeMarkers();
    }
    
    private filterBuses(buses: Bus[]): Bus[] {
        if(!this.swap) return buses.filter( bus => bus.Direction === this.line.Description );
        else return buses.filter( bus => bus.Direction !== this.line.Description );
    }
    
    private checkMarkerChanges(markers: any): void {
        if(!markers.previousValue && this.isArray(markers.currentValue)) {
            // Just loaded the map view
            this.removeMarkers();
            this.updateMarkers(markers.currentValue);
        } else if(this.isArray(markers.previousValue) && this.isArray(markers.currentValue)) {
            // Received new data
            if(JSON.stringify(markers.previousValue)!==JSON.stringify(markers.currentValue))
                this.updateMarkers(markers.currentValue);
        }
    }
}