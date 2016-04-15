'use strict';
declare var plugin: any;
import { Page, Platform, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps } from '../../components/maps/controller';
import { SearchPage } from '../search/page';

@Page({
  templateUrl: 'build/pages/map/template.html',
  directives: [GoogleMaps]
})
export class MapPage {
    
    private canvas: Element;
    private map: any;
    private platform: Platform;
    private nav: NavController;
    private params: NavParams;
    private title: string = 'Rio Bus';
    
    public get Title(): string {
        return this.title;
    }
    
    constructor(platform: Platform, nav: NavController, params: NavParams) {
        this.platform = platform;
        this.params = params;
        this.nav = nav;
        this.title = this.params.data.query;
    }
}
