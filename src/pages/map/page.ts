import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { UPDATE_TIMEOUT } from '../../const';
import { SearchService } from '../../services/search';
import { Bus } from '../../models/bus';
import { Line, Itinerary } from '../../models/itinerary';
import { ItineraryManager } from '../../managers/itinerary';
import { Toast } from '../../core/toast';
import { Analytics } from '../../core/analytics';
import strings from '../../strings';

/**
 * MapPage represents the view with the map presented right after the search view.
 * @class {MapPage}
 */
@Component({
    templateUrl: 'template.html',
    providers: [Toast],
})
export class MapPage {

    private params: NavParams;
    private service: SearchService;
    private manager: ItineraryManager;
    private toast: Toast;
    private timer: any;
    public buses: Bus[];
    public line: Line;
    public trajectory: Itinerary;
    public title: string = '';

    public get Text(): any {
        return strings;
    }

    public constructor(params: NavParams, service: SearchService, manager: ItineraryManager, toast: Toast) {
        this.params = params;
        this.service = service;
        this.manager = manager;
        this.toast = toast;

        if (this.params.data.line) {
            this.line = this.params.data.line;
            this.title = this.line.Line;
        }
        else if (this.params.data.query) {
            this.title = this.params.data.query;
        }
        Analytics.trackView('MapPage');
    }

    /**
     * Part of Ionic lifecycle. Runs when the view was just presented.
     * @return {void}
     */
    public ionViewDidLoad(): void {
        this.showTrajectory();
        this.updateMarkers();
        this.timer = setInterval(() => this.updateMarkers(), UPDATE_TIMEOUT);
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be hidden.
     * @return {void}
     */
    public ionViewWillLeave(): void {
        clearInterval(this.timer);
    }

    /**
     * Retrieves the trajectory of the searched line to present on the map.
     * @return {void}
     */
    private showTrajectory(): void {
        if (this.title.split(',').length === 1)
            this.manager.getByLine(this.title).then(itinerary => this.trajectory = itinerary);
    }

    /**
     * Update the markers on the map.
     * @return {void}
     */
    private updateMarkers(): void {
        this.service.getBuses(this.title).then((buses: Bus[]) => this.buses = buses, error => {
            this.buses = [];
            clearInterval(this.timer);
            if (error.status === 404) {
                console.log(`[404] No buses were found in the the query '${this.title}'.`);
                this.toast.show(this.Text.PAGE_MAP_ERROR_NO_BUSES, Toast.LONG);
            }
            else {
                console.log(`[${error.status}] An error ocurred.`);
                this.toast.show(this.Text.PAGE_MAP_ERROR_UNKNOWN, Toast.LONG);
            }
        });
    }
}
