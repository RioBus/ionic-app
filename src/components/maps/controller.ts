import { HIDE_TRAJECTORY_KEY, ENABLE_SWAP_DIRECTION } from '../../const';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Component, OnChanges, OnDestroy } from '@angular/core';
import { Bus } from '../../models/bus';
import { Line, Itinerary } from '../../models/itinerary';
import { MarkerController } from './marker';
import { PreferencesManager } from '../../managers/preferences';

// Configuration for the map available resources and presentation
const mapConfig: any =  {
    mapType: 'MAP_TYPE_NORMAL',
    controls: { compass: true, myLocationButton: true, indoorPicker: false, zoom: false },
    camera: { latLng: new GoogleMapsLatLng(-22.9083, -43.1964), zoom: 12 },
};

/**
 * Represents the <google-maps> HTML component.
 * @class {GoogleMapsComponent}
 */
@Component({
    selector: 'google-maps',
    templateUrl: 'template.html',
    inputs: ['markers', 'line', 'trajectory'],
})
export class GoogleMapsComponent implements OnChanges, OnDestroy {

    private map: GoogleMap;
    private mcontrol: MarkerController;
    private swap: boolean = false;
    private static instance: GoogleMapsComponent;
    public markers: Bus[];
    public trajectory: Itinerary;
    public line: Line;
    public swapable: boolean = ENABLE_SWAP_DIRECTION;
    public preferences: PreferencesManager;

    public constructor(platform: Platform, prefs: PreferencesManager) {
        this.preferences = prefs;
        GoogleMapsComponent.instance = this;
        platform.ready().then(() => this.onPlatformReady());
    }

    /**
     * @private
     * Called when the Ionic platform is ready. It initializes the map.
     * @return {void}
     */
    private onPlatformReady(): void {
        this.map = new GoogleMap('map_canvas');
        this.mcontrol = new MarkerController(this.map);
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => this.onMapReady());
    }

    /**
     * Called when the view is closed
     * @return {void}
     */
    public ngOnDestroy(): void {
        this.mcontrol.hideTrajectory();
        this.removeMarkers();
    }

    /**
     * Called when the input data has changes
     * @param {Object} changes - changes object
     * @return {void}
     */
    public ngOnChanges(changes: any): void {
        if (changes.markers) this.onMarkerChanges(changes.markers);
        if (changes.trajectory) this.onTrajectoryChanges(changes.trajectory);
    }

    /**
     * @private
     * Called when the map is ready to be presented in the view.
     * @return {void}
     */
    private onMapReady(): void {
        console.log('Map ready');
        this.map.setOptions(mapConfig);
    }

    /**
     * Handles the swap direction button click from outside. It implements the procedure to check
     * wether the direction is swipeable or not.
     * @return {boolean}
     */
    public onSwapDirection(): boolean {
        if (this.swapable) {
            let self: GoogleMapsComponent = GoogleMapsComponent.instance;
            if (self.line.Description !== 'desconhecido') {
                self.swap = !self.swap;
                self.removeMarkers();
                self.updateMarkers(self.markers);
                return true;
            }
        }
        return false;
    }

    /**
     * @private
     * Called when the trajectory data changed. It updates the trajectory displayed in the map.
     * @param {Object} trajectory - new trajectory object
     * @return {void}
     */
    private onTrajectoryChanges(trajectory: any): void {
        if (this.trajectory) {
            this.mcontrol.hideTrajectory();
            this.preferences.getKey<boolean>(HIDE_TRAJECTORY_KEY).then( enabled => {
                if (!enabled) this.mcontrol.showTrajectory(this.trajectory);
            });
        }
    }

    /**
     * @private
     * Checks if the given value is an Array instance
     * @param {any} value - value to check
     * @return {boolean}
     */
    private isArray(value: any): boolean {
        return value instanceof Array;
    }

    /**
     * @private
     * Called when there are updates in the inputted data. It handles the markers update
     * process.
     * @param {Object} markers - data updates
     * @return {void}
     */
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

    /**
     * @private
     * Updates the markers in the map
     * @param {Bus[]} current - The new buses list
     * @return {void}
     */
    private updateMarkers(current: Bus[]): void {
        let buses: Bus[] = (this.swapable) ? this.filterBuses(current) : current;
        buses.forEach(bus => this.mcontrol.setMarker(bus));
    }

    /**
     * @private
     * Remove all the markers in the map.
     * @return {void}
     */
    private removeMarkers(): void {
        this.mcontrol.removeMarkers();
    }

    /**
     * @private
     * Filters the given bus list for show only those on the current direction
     * @param {Bus[]} buses - bus list input
     * @return {Bus[]}
     */
    private filterBuses(buses: Bus[]): Bus[] {
        if (!this.swap) return buses.filter(bus => bus.Direction === this.line.Description);
        else return buses.filter(bus => bus.Direction !== this.line.Description);
    }
}
