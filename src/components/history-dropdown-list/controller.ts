import { Button, Icon, List, Item } from 'ionic-angular';
import { Component } from '@angular/core';
import { History } from '../../models/history';
import { LineItem } from '../line-item/controller';

/**
 * Represents the <history-dropdown-list> HTML component.
 * @class {HistoryDropdownList}
 */
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

    /**
     * Toggles a group's cascade visualization on/off
     * @return {void}
     */
    public toggleItem(): void {
        this.show = !this.show;
    }

    /**
     * Answers wether it should display the history group or not.
     * @return {boolean}
     */
    public presentGroup(): boolean {
        return this.show;
    }
}
