'use strict';

import { Button, Icon, List, Item, NavController } from 'ionic-angular';
import { Component } from 'angular2/core';
import { History } from '../../models/history';
import { LineItem } from '../line-item/controller';

@Component({
    selector: 'history-dropdown-list',
    templateUrl: 'build/components/history-dropdown-list/template.html',
    inputs: ['items', 'title'],
    directives: [Button, Icon, Item, List, LineItem],
})
export class HistoryDropdownList {

    public title: string;
    public items: History[];
    private show: boolean = false;
    private nav: NavController;

    public constructor(nav: NavController) {
        this.nav = nav;
    }

    public toggleItem(): void {
        this.show = !this.show;
    }

    public presentGroup(): boolean {
        return this.show;
    }
}
