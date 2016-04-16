'use strict';
import { Page, Platform, NavController } from 'ionic-angular';
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
    }
    
    public onPageLoaded(): void {
        this.itineraryService.getItineraries().then((lines: Line[]) => {
            this.lines = lines;
            this.items = this.sort(lines);
        });
    }
    
    public onPageWillLeave(): void {}
    
    public find(line: Line): void {
        this.nav.push(MapPage, { query: line.Line });
    }
    
    public findText(): void {
        this.nav.push(MapPage, { query: this.queryText });
    }
    
    public filter(event: any): void {
        if(this.queryText.length>0) {
            this.items = this.lines.filter((value: Line, index: number, lines: Line[]): boolean => {
                return value.Line.toLowerCase().indexOf(this.queryText.toLowerCase())>-1 || value.Description.toLowerCase().indexOf(this.queryText.toLowerCase())>-1;
            });
            this.items = this.sort(this.items);
        } else {
            this.items = this.sort(this.items);
        }
    }
    
    private sort(items: Line[]): Line[] {
        return items.sort((a: Line, b: Line) => {
            // if(a.Line > b.Line) return 1;
            // else if(a.Line < b.Line) return -1;
            // else return 0;
            if(!isNaN(parseInt(a.Line)) && !isNaN(parseInt(b.Line))) return (parseInt(a.Line) - parseInt(b.Line));
            else if(!isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return -1;
            else if(isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return 0;
            else return 1; 
        });
    }
}
