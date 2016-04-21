'use strict';
declare var plugin: any;
import { Page, NavParams } from 'ionic-angular';
import { UPDATE_TIMEOUT } from '../../const';
import { GoogleMaps } from '../../components/maps/controller';
import { SearchService } from '../../services/search';
import { Bus } from '../../models/bus';
import { Line } from '../../models/itinerary';

@Page({
  templateUrl: 'build/pages/map/template.html',
  directives: [GoogleMaps]
})
export class MapPage {
    
    private canvas: Element;
    private params: NavParams;
    private service: SearchService;
    private title: string = 'Rio Bus';
    private timer: any;
    private buses: Bus[];
    private line: Line;
    
    public get Title(): string {
        return this.title;
    }
    
    public get Markers(): Bus[] {
        return this.buses;
    }
    
    public get Line(): Line {
        return this.line;
    }
    
    constructor(params: NavParams, service: SearchService) {
        this.params = params;
        this.service = service;
        
        if(this.params.data.line) {
            this.line = this.params.data.line;
            this.title = this.line.Line;
        }
        else if(this.params.data.query) {
            this.title = this.params.data.query;
        }
    }
    
    private onPageLoaded(): void {
        this.updateMarkers();
        this.timer = setInterval(() => {
            this.updateMarkers();
        }, UPDATE_TIMEOUT);
    }
    
    private updateMarkers(): void {
        this.service.getBuses(this.title).then((buses: Bus[]) => {
            this.buses = buses;
        }, error => {
            this.buses = [];
            clearInterval(this.timer);
            if(error.status===404) console.log(`[404] No buses were found the the query '${this.title}'.`);
            else console.log(`[${error.status}] An error ocurred.`);
        });
    }
    
    private onPageWillLeave(): void {
        clearInterval(this.timer);
    }
}
