'use strict';
import { Page, Platform, NavController, Alert } from 'ionic-angular';
import { Line } from '../../models/itinerary';
import { ItineraryManager } from '../../managers/itinerary';
import { ItineraryService } from '../../services/itinerary';
import { MapPage } from '../map/page';

@Page({
  templateUrl: 'build/pages/search/template.html',
})
export class SearchPage {
    
    private static limit: number = 30;
    private platform: Platform;
    private nav: NavController;
    private items: Line[] = [];
    private lines: Line[] = [];
    private queryText: string = '';
    private itineraryService: ItineraryService;
    
    public get Items(): Line[] {
        return this.items;
    }
    
    constructor(platform: Platform, nav: NavController, itineraryService: ItineraryService) {
        this.platform = platform;
        this.nav = nav;
        this.itineraryService = itineraryService;
        this.initialize();
    }
    
    private initialize(): void {
        console.log("Trying to retrieve itinerary headers...");
        this.itineraryService.getItineraries().then((lines: Line[]) => {
            this.lines = lines;
            this.items = lines;
            console.log(`Found ${lines.length} headers.`);
        });
    }
    
    public find(line: Line): void {
        console.log(`Decided to search for '${line.Line}'.`);
        this.nav.push(MapPage, { query: line.Line });
    }
    
    public findText(): void {
        console.log(`Decided to search for '${this.queryText}'.`);
        this.nav.push(MapPage, { query: this.queryText });
    }
    
    public filter(event: any): void {
        if(this.queryText.length>0) {
            this.items = this.lines.filter((value: Line, index: number, lines: Line[]): boolean => {
                return value.Line.toLowerCase().indexOf(this.queryText.toLowerCase())>-1 || value.Description.toLowerCase().indexOf(this.queryText.toLowerCase())>-1;
            });
        } else {
            this.items = this.lines;
        }
    }
}
