'use strict';
import { Page, Platform, NavController } from 'ionic-angular';
import { Line } from '../../models/itinerary';
import { History } from '../../models/history';
import { ItineraryService } from '../../services/itinerary';
import { MapPage } from '../map/page';
import { FavoritesDAO } from '../../dao/favorites';
import { HistoryDAO } from '../../dao/history';
import { LinesDAO } from '../../dao/lines';

@Page({
  templateUrl: 'build/pages/search/template.html',
})
export class SearchPage {
    
    private static limit: number = 30;
    private platform: Platform;
    private nav: NavController;
    private items: Line[] = [];
    private lines: Line[] = [];
    private favorites: Line[] = [];
    private histories: History[] = [];
    private queryText: string = '';
    private itineraryService: ItineraryService;
    private fdao: FavoritesDAO;
    private hdao: HistoryDAO;
    private ldao: LinesDAO;
    
    public get Items(): Line[] {
        return this.items;
    }
    
    public get Histories(): History[] {
        return this.histories;
    }
    
    public constructor(platform: Platform, nav: NavController, itineraryService: ItineraryService) {
        this.platform = platform;
        this.nav = nav;
        this.itineraryService = itineraryService;
        this.fdao = new FavoritesDAO();
        this.hdao = new HistoryDAO();
        this.ldao = new LinesDAO();
    }
    
    public onPageLoaded(): void {
        this.loadRecents();
        this.loadLines();
    }
    
    public onPageWillEnter(): void {
        document.getElementById('search-view').style.display = 'initial';
    }
    
    public onPageWillLeave(): void {
        document.getElementById('search-view').style.display = 'none';
    }
    
    public onClickOnStar(line: Line): void {
        if(this.isFavorite(line)) this.fdao.remove(line).then( (response: boolean) => this.onUnstar(response, line) );
        else this.fdao.save(line).then( (response: boolean) => this.onStar(response, line) );
    }
    
    private onStar(response: boolean, line: Line): void {
        if(response) this.favorites.push(line);
    }
    
    private onUnstar(response: boolean, line: Line): void {
        if(response) {
            let index: number = this.favorites.findIndex( fav => fav.Line === line.Line );
            this.favorites.splice(index, 1);
        }
    }
    
    public find(line: Line): void {
        let history: History = new History(line, new Date());
        this.hdao.save(history).then( saved => {
            if(saved) console.log(`Saved ${line.Line} to history.`);
            this.nav.push(MapPage, { line: line });
        });
    }
    
    public findText(): void {
        let query: string = this.queryText.replace('  ', ' ').replace(' , ', ',').replace(', ', ',').replace(' ,', ',');
        let line: Line = new Line(query, '');
        let history: History = new History(line, new Date());
        this.hdao.save(history).then( saved => {
            if(saved) console.log(`Saved ${line.Line} to history.`);
            this.nav.push(MapPage, { query: query });
        });
    }
    
    public isFavorite(line: Line): boolean {
        return this.favorites.some( fav => line.Line === fav.Line );
    }
    
    public filter(event: any): void {
        if(this.queryText.length>0) {
            this.items = this.lines.filter((value: Line, index: number, lines: Line[]): boolean => {
                return value.Line.toLowerCase().indexOf(this.queryText.toLowerCase())>-1 || value.Description.toLowerCase().indexOf(this.queryText.toLowerCase())>-1;
            });
        } else this.items = this.lines;
    }
    
    private loadRecents(): void {
        this.hdao.getLimited(2).then( histories => this.histories = histories );
    }
    
    private loadLines(): void {
        this.fdao.getAll().then((lines: Line[]) => {
            this.favorites = lines;
            this.ldao.getAll().then(lines => {
                if(lines.length>0) {
                    console.log(`Found ${lines.length} lines in the memory.`);
                    this.lines = lines;
                    this.items = lines;
                }
                else this.downloadLines();
            });
        });
    }
    
    private downloadLines(): void {
        this.itineraryService.getItineraries().then((lines: Line[]) => {
            this.lines = lines;
            this.items = lines;
            this.saveLines(lines);
        });
    }
    
    private saveLines(lines: Line[]): void {
        this.ldao.saveAll(lines).then( () => console.log(`Saved ${lines.length}.`) );
    }
}
