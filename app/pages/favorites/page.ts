'use strict';
import { Page, Platform, NavController } from 'ionic-angular';
import { Line } from '../../models/itinerary';
import { MapPage } from '../map/page';
import { FavoritesDAO } from '../../dao/favorites';

@Page({
  templateUrl: 'build/pages/favorites/template.html',
})
export class FavoritesPage {
    
    private platform: Platform;
    private nav: NavController;
    private items: Line[] = [];
    private dao: FavoritesDAO;
    
    public get Title(): string {
        return 'Favoritos';
    }
    
    public get Items(): Line[] {
        return this.items;
    }
    
    public constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        this.dao = new FavoritesDAO();
    }
    
    public onPageLoaded(): void {}
    
    public onPageWillEnter(): void {
        this.loadFavorites();
        document.getElementById('favorites-view').style.display = 'initial';
    }
    
    public onPageWillLeave(): void {
        document.getElementById('favorites-view').style.display = 'none';
    }
    
    private loadFavorites(): void {
        this.dao.getAll().then(line => this.items = line);
    }
    
    public find(line: Line): void {
        this.nav.push(MapPage, { line: line });
    }
    
    public onClickOnStar(line: Line): void {
        this.dao.remove(line).then( (response: boolean) => this.onUnstar(response, line) );
    }
    
    private onUnstar(response: boolean, line: Line): void {
        if(response) {
            let index: number = this.items.findIndex( fav => fav.Line === line.Line );
            this.items.splice(index, 1);
        }
    }
    
    private sort(items: Line[]): Line[] {
        return items.sort((a: Line, b: Line) => {
            if(!isNaN(parseInt(a.Line)) && !isNaN(parseInt(b.Line))) return (parseInt(a.Line) - parseInt(b.Line));
            else if(!isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return -1;
            else if(isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return 0;
            else return 1; 
        });
    }
}
