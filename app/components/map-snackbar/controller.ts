import { Button } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoriteButton } from '../favorite-button/controller';
import { BasePage } from '../../core/page';

/**
 * Represents the <map-snackbar> HTML component.
 * @class {MapSnackbar}
 */
@Component({
    selector: 'map-snackbar',
    templateUrl: 'build/components/map-snackbar/template.html',
    inputs: ['line', 'swapDirection', 'swapable'],
    directives: [Button, FavoriteButton],
})
export class MapSnackbar extends BasePage implements OnInit {

    public line: Line;
    public swapable: boolean;
    public swapDirection: () => boolean;
    public coming: string;
    public going: string;

    public constructor() {
        super();
    }

    /**
     * Part of Ionic lifecycle. Runs when the component is initialized.
     * @return {void}
     */
    public ngOnInit(): void {
        if (this.line && this.line.Description.indexOf(' X ') > -1) {
            let tmp: string[] = this.line.Description.split(' X ');
            this.coming = tmp[0];
            this.going = tmp[1];
        }
    }

    /**
     * Handles the event of click over swap direction button
     * @return {void}
     */
    public onToggleDirection(): void {
        let toggle: boolean = this.swapDirection(); // Method from MapPage
        if (toggle) {
            let tmp: string = this.coming;
            this.coming = this.going;
            this.going = tmp;
        }
    }
}
