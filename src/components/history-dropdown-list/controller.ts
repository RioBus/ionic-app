import { Component, Input } from '@angular/core';
import { History } from '../../models/history';

/**
 * Represents the <history-dropdown-list> HTML component.
 * @class {HistoryDropdownList}
 */
@Component({
    selector: 'history-dropdown-list',
    templateUrl: 'template.html',
})
export class HistoryDropdownList {

    @Input() public title: string;
    @Input() public items: History[];
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
