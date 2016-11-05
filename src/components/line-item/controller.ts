import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Line } from '../../models/itinerary';
import { History } from '../../models/history';
import { MapPage } from '../../pages/map/page';
import { HistoryDAO } from '../../dao/history';
import { Analytics } from '../../core/analytics';

/**
 * Represents the <line-item> HTML component.
 * @class {LineItem}
 */
@Component({
    selector: 'line-item',
    template: `
        <div (click)="onClick()">
            <h2>{{ line.Line }}</h2>
            <p>{{ line.Description }}</p>
        </div>
    `,
})
export class LineItem {

    @Input() public line: Line;

    public constructor(private nav: NavController, private dao: HistoryDAO) {}

    /**
     * Handles the click event over the history content row
     * @return {void}
     */
    public onClick(): void {
        Analytics.trackEvent('LineItem', 'click', this.line.Line);
        let history: History = new History(this.line, new Date());
        this.dao.save(history).then(saved => {
            if (saved) console.log(`Saved ${this.line.Line} to history.`);
            this.nav.push(MapPage, { line: this.line });
        });
    }
}
