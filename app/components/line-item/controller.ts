'use strict';

import { NavController } from 'ionic-angular';
import { Component } from 'angular2/core';
import { Line } from '../../models/itinerary';
import { History } from '../../models/history';
import { MapPage } from '../../pages/map/page';
import { HistoryDAO } from '../../dao/history';

@Component({
    selector: 'line-item',
    templateUrl: 'build/components/line-item/template.html',
    inputs: ['line'],
})
export class LineItem {

    public line: Line;
    private nav: NavController;
    private dao: HistoryDAO;

    public constructor(nav: NavController) {
        this.nav = nav;
        this.dao = new HistoryDAO();
    }

    public onClick(): void {
        let history: History = new History(this.line, new Date());
        this.dao.save(history).then(saved => {
            if (saved) console.log(`Saved ${this.line.Line} to history.`);
            this.nav.push(MapPage, { line: this.line });
        });
    }
}
