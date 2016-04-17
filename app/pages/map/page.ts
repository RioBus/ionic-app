'use strict';
declare var plugin: any;
import { Page, Platform, NavController, NavParams } from 'ionic-angular';
import { UPDATE_TIMEOUT } from '../../const';
import { GoogleMaps } from '../../components/maps/controller';
import { SearchService } from '../../services/search';
import { Bus } from '../../models/bus';

@Page({
  templateUrl: 'build/pages/map/template.html',
  directives: [GoogleMaps]
})
export class MapPage {
    
    private canvas: Element;
    private platform: Platform;
    private nav: NavController;
    private params: NavParams;
    private service: SearchService;
    private title: string = 'Rio Bus';
    private timer: any;
    
    public get Title(): string {
        return this.title;
    }
    
    constructor(platform: Platform, nav: NavController, params: NavParams, service: SearchService) {
        this.platform = platform;
        this.params = params;
        this.nav = nav;
        this.service = service;
        this.title = this.params.data.query;
    }
    
    private onPageLoaded(): void {
        this.updateMarkers();
        this.timer = setInterval(() => {
            this.updateMarkers();
        }, UPDATE_TIMEOUT);
    }
    
    private updateMarkers(): void {
        this.service.getBuses(this.title).then((buses: Bus[]) => {
            console.log(`Found ${buses.length} buses for the query '${this.title}'.`);
        });
    }
    
    private onPageWillLeave(): void {
        clearInterval(this.timer);
    }
}
