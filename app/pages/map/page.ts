'use strict';
declare var plugin: any;
import { Page, Platform, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps } from '../../components/maps/controller';
import { MapManager } from '../../managers/map';
import { SearchService } from '../../services/search';
import { Bus } from '../../models/bus';

@Page({
  templateUrl: 'build/pages/map/template.html',
  directives: [GoogleMaps]
})
export class MapPage {
    
    private canvas: Element;
    private manager: MapManager;
    private platform: Platform;
    private nav: NavController;
    private params: NavParams;
    private service: SearchService;
    private title: string = 'Rio Bus';
    
    public get Title(): string {
        return this.title;
    }
    
    constructor(platform: Platform, nav: NavController, params: NavParams, service: SearchService) {
        this.platform = platform;
        this.params = params;
        this.nav = nav;
        this.service = service;
        this.manager = MapManager.getInstance();
        this.title = this.params.data.query;
    }
    
    private onPageLoaded(): void {
        this.service.getBuses(this.title).then((buses: Bus[]) => {
            console.log(`Found ${buses.length} buses.`);
        });
    }
}
