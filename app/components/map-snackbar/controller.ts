'use strict';

import { NavController, Platform, Button, Icon } from 'ionic-angular';
import { Component } from 'angular2/core';
import { Line } from '../../models/itinerary';

@Component({
    selector: 'map-snackbar',
    templateUrl: 'build/components/map-snackbar/template.html',
    inputs: ['line'],
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
    }
    
    private ngOnInit(): void {
        if(this.line && this.line.Description.indexOf(' X ')>-1) {
            let tmp: string[] = this.line.Description.split(' X ');
            this.coming = tmp[0];
            this.going = tmp[1];
        }
    }
    
    public toggleDirection(): void {
        console.log("Toggling direction...");
        let tmp: string = this.coming;
        this.coming = this.going;
        this.going = tmp;
    }
    
    public toggleStar(): void {
        console.log("Toggling star...");
        this.favorite = !this.favorite;
    }
}