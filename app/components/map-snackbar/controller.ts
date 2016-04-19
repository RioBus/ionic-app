'use strict';

import { NavController, Platform, Button, Icon } from 'ionic-angular';
import { Component } from 'angular2/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';

@Component({
    selector: 'map-snackbar',
    templateUrl: 'build/components/map-snackbar/template.html',
    inputs: ['line', 'swapDirection'],
    directives: [Button, Icon],
})
export class MapSnackbar {
    
    private nav: NavController;
    private platform: Platform;
    private map: any;
    private markerList: any = {};
    private coming: string = 'SENTIDO';
    private going: string = 'DESCONHECIDO';
    private line: Line;
    private favorite: boolean = false;
    private dao: FavoritesDAO;
    private swapDirection: () => boolean;
    
    public get Coming(): string {
        return this.coming;
    }
    
    public get Going(): string {
        return this.going;
    }
    
    public get IsFavorite(): boolean {
        return this.favorite;
    }
    
    constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        this.dao = new FavoritesDAO();
    }
    
    private ngOnInit(): void {
        if(this.line && this.line.Description.indexOf(' X ')>-1) {
            let tmp: string[] = this.line.Description.split(' X ');
            this.coming = tmp[0];
            this.going = tmp[1];
            this.dao.getByLine(this.line.Line).then( (line: Line) => {
                this.onFavoriteCheck(line);
            }, error => console.log );
        }
    }
    
    private onFavoriteCheck(line: Line): void {
        if(line!==null) this.favorite = true;
    }
    
    public onToggleDirection(): void {
        let toggle: boolean = this.swapDirection(); // Method from MapPage
        if(toggle) {
            let tmp: string = this.coming;
            this.coming = this.going;
            this.going = tmp;
        }
    }
    
    public toggleStar(): void {
        if(this.favorite) this.dao.remove(this.line).then( (response: boolean) => this.onUnstar(response) );
        else this.dao.save(this.line).then( (response: boolean) => this.onStar(response) );
    }
    
    private onStar(response: boolean): void {
        if(response) this.favorite = true;
        else console.log(`Failed to star the line '${this.line.Line}'`);
    }
    
    private onUnstar(response: boolean): void {
        if(response) this.favorite = false;
        else console.log(`Failed to unstar the line '${this.line.Line}'`);
    }
}