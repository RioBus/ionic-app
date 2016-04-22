'use strict';

import { NavController } from 'ionic-angular';
import { Component } from 'angular2/core';
import { Line } from '../../models/itinerary';
import { MapPage } from '../../pages/map/page';

@Component({
    selector: 'line-item',
    templateUrl: 'build/components/line-item/template.html',
    inputs: ['line'],
})
export class LineItem {

    public line: Line;
    private nav: NavController;

    public constructor(nav: NavController) {
        this.nav = nav;
    }

    public onClick(): void {
        this.nav.push(MapPage, { line: this.line });
    }
}
