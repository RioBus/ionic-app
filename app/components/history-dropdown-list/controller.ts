'use strict';

import { Button, Icon, List, Item, NavController } from 'ionic-angular';
import { Component } from 'angular2/core';
import { History } from '../../models/history';
import { MapPage } from '../../pages/map/page';

@Component({
    selector: 'history-dropdown-list',
    templateUrl: 'build/components/history-dropdown-list/template.html',
    inputs: ['items', 'title'],
    directives: [Button, Icon, Item, List]
})
export class HistoryDropdownList {
    
    private title: string;
    private items: History[];
    private click: (item: History) => void;
    private show: boolean = false;
    private nav: NavController;
    
    public constructor(nav: NavController) {
        this.nav = nav;
    }
    
    public get Header(): string {
        return this.title;
    }
    
    public get Items(): any {
        return this.items;
    }
    
    public toggleItem() {
        this.show = !this.show;
    }
    
    public presentGroup(): boolean {
        return this.show;
    }
    
    public onItemClick(item: History): void {
        this.nav.push(MapPage, { line: item.Line });
    }
}