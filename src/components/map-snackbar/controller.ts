import { Component, OnInit, Input } from '@angular/core';
import { Line } from '../../models/itinerary';
import { Analytics } from '../../core/analytics';
import strings from '../../strings';

/**
 * Represents the <map-snackbar> HTML component.
 * @class {MapSnackbar}
 */
@Component({
    selector: 'map-snackbar',
    templateUrl: 'template.html',
})
export class MapSnackbar implements OnInit {

    @Input() public line: Line;
    @Input() public swapable: boolean;
    @Input() public swapDirection: () => boolean;
    public coming: string;
    public going: string;
    
    public get Text(): any {
        return strings;
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
        Analytics.trackEvent('Toggle direction button', 'click');
        let toggle: boolean = this.swapDirection(); // Method from MapPage
        if (toggle) {
            let tmp: string = this.coming;
            this.coming = this.going;
            this.going = tmp;
        }
    }
}
