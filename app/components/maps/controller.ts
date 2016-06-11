'use strict';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { MapSnackbar } from '../map-snackbar/controller';
import { Component, OnChanges, OnDestroy } from '@angular/core';
import { Bus } from '../../models/bus';
import { Line, Itinerary } from '../../models/itinerary';
import { MarkerController } from './marker';

const mapConfig: any =  {
    mapType: 'MAP_TYPE_NORMAL',
    controls: { compass: true, myLocationButton: true, indoorPicker: false, zoom: false },
    camera: { latLng: new GoogleMapsLatLng('-22.9083', '-43.1964'), zoom: 12 },
};

@Component({
    selector: 'google-maps',
    templateUrl: 'build/components/maps/template.html',
    inputs: ['markers', 'line', 'trajectory'],
    directives: [MapSnackbar],
})
export class GoogleMapsComponent implements OnChanges, OnDestroy {

    private map: GoogleMap;
    private markers: Bus[];
    private trajectory: Itinerary;
    private line: Line;
    private mcontrol: MarkerController;
    private swap: boolean = false;
    private static instance: GoogleMapsComponent;

    public constructor(platform: Platform) {
        GoogleMapsComponent.instance = this;
        platform.ready().then(() => this.onPlatformReady());
    }

    private onPlatformReady(): void {
        this.map = new GoogleMap('map_canvas');
        this.mcontrol = new MarkerController(this.map);
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => this.onMapReady());
    }

    public ngOnDestroy(): void {
        this.mcontrol.hideTrajectory();
        this.removeMarkers();
    }

    public ngOnChanges(changes: any): void {
        if (changes.markers) this.onMarkerChanges(changes.markers);
        if (changes.trajectory) this.onTrajectoryChanges(changes.trajectory);
    }

    private onMapReady(): void {
        console.log('Map ready');
        this.map.setOptions(mapConfig);
    }

    public onSwapDirection(): boolean {
        let self: GoogleMapsComponent = GoogleMapsComponent.instance;
        if (self.line.Description !== 'desconhecido') {
            self.swap = !self.swap;
            self.removeMarkers();
            self.updateMarkers(self.markers);
            return true;
        }
        return false;
    }

    private onTrajectoryChanges(trajectory: any): void {
        if (this.trajectory) {
            this.mcontrol.hideTrajectory();
            this.mcontrol.showTrajectory(this.trajectory);
        }
    }

    private isArray(value: any): boolean {
        return value instanceof Array;
    }

    private onMarkerChanges(markers: any): void {
        if (!markers.previousValue && this.isArray(markers.currentValue)) {
            // Just loaded the map view
            this.removeMarkers();
            this.updateMarkers(markers.currentValue);
        } else if (this.isArray(markers.previousValue) && this.isArray(markers.currentValue)) {
            // Received new data
            if (JSON.stringify(markers.previousValue) !== JSON.stringify(markers.currentValue))
                this.updateMarkers(markers.currentValue);
        }
    }

    private updateMarkers(current: Bus[]): void {
        this.filterBuses(current).forEach(bus => {
            this.mcontrol.setMarker(bus);
        });
    }

    private removeMarkers(): void {
        this.mcontrol.removeMarkers();
    }

    private filterBuses(buses: Bus[]): Bus[] {
        if (!this.swap) return buses.filter(bus => bus.Direction === this.line.Description);
        else return buses.filter(bus => bus.Direction !== this.line.Description);
    }
}
