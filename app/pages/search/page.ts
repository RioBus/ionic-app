'use strict';
import { Page, NavController } from 'ionic-angular';
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
    
    private itineraryService: ItineraryService;
    private nav: NavController;
    
    private items: Line[] = [];
    private itemsBkp: Line[] = [];
    private favorites: Line[] = [];
    private histories: History[] = [];
    
    private fdao: FavoritesDAO;
    private hdao: HistoryDAO;
    private ldao: LinesDAO;
    
    private queryText: string = '';
    private limit: number = 10;
    private skip: number = 0;
    public showSearchBox: boolean = false;
    
    public get Items(): Line[] {
        return this.items;
    }
    
    public get Histories(): History[] {
        return this.histories;
    }
    
    public isFavorite(line: Line): boolean {
        return this.favorites.some( fav => line.Line === fav.Line );
    }
    
    public constructor(nav: NavController, itineraryService: ItineraryService) {
        this.nav = nav;
        this.itineraryService = itineraryService;
        this.fdao = new FavoritesDAO();
        this.hdao = new HistoryDAO();
        this.ldao = new LinesDAO();
    }
    
    public onPageLoaded(): void {
        this.loadRecents();
        this.loadFavorites();
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
    
    public filter(event: any): void {
        if(this.queryText.length>0) {
            if(this.itemsBkp.length===0) this.itemsBkp = this.items;
            this.ldao.getAll().then(lines => {
                this.items = lines.filter((value: Line, index: number, lines: Line[]): boolean => {
                    return value.Line.toLowerCase().indexOf(this.queryText.toLowerCase())>-1 || value.Description.toLowerCase().indexOf(this.queryText.toLowerCase())>-1;
                });
            });
        } else {
            this.items = this.itemsBkp;
            this.itemsBkp = [];
        }
    }
    
    private loadRecents(): void {
        this.hdao.getLimited(2).then( histories => this.histories = histories );
    }
    
    private loadFavorites(): void {
        this.fdao.getAll().then((lines: Line[]) => {
            this.favorites = lines;
            this.loadLines();
        });
    }
    
    private loadLines(infiniteScroll?: any): void {
        this.ldao.getLimited(this.limit, this.skip).then(lines => {
            if(lines.length>0) {
                this.items = this.items.concat(lines);
                this.skip += this.limit;
                if(infiniteScroll) infiniteScroll.complete();
            }
            else this.downloadLines(infiniteScroll);
        });
    }
    
    private downloadLines(infiniteScroll?: any): void {
        if(this.queryText.length>0 && infiniteScroll) infiniteScroll.complete();
        
        this.itineraryService.getItineraries().then((lines: Line[]) => {
            this.ldao.saveAll(lines).then( () => {
                console.log(`Saved ${lines.length}.`);
                let slice: Line[] = lines.splice(0, this.limit);
                this.items = this.items.concat(slice);
                this.skip += this.limit;
                if(infiniteScroll) infiniteScroll.complete();
            });
        });
    }
}