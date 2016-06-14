'use strict';

import { Button } from 'ionic-angular';
import { Component } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoriteButton } from '../favorite-button/controller';

@Component({
    selector: 'map-snackbar',
    templateUrl: 'build/components/map-snackbar/template.html',
    inputs: ['line', 'swapDirection', 'swapable'],
    directives: [Button, FavoriteButton],
})
export class MapSnackbar {

    public line: Line;
    public swapable: boolean;
    public swapDirection: () => boolean;
    public coming: string = 'SENTIDO';
    public going: string = 'DESCONHECIDO';

    public ngOnInit(): void {
        if (this.line && this.line.Description.indexOf(' X ') > -1) {
            let tmp: string[] = this.line.Description.split(' X ');
            this.coming = tmp[0];
            this.going = tmp[1];
        }
    }

    public onToggleDirection(): void {
        let toggle: boolean = this.swapDirection(); // Method from MapPage
        if (toggle) {
            let tmp: string = this.coming;
            this.coming = this.going;
            this.going = tmp;
        }
    }
}
