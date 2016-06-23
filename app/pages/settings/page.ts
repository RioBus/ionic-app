import { Component } from '@angular/core';
import { AppVersion } from 'ionic-native';
import { BasePage } from '../../core/page';
import { ClearHistory } from '../../components/clear-history/controller';
import { ItineraryManager } from '../../managers/itinerary';

/**
 * SettingsPage represents the view with app's configurations.
 * @class {SettingsPage}
 */
@Component({
    templateUrl: 'build/pages/settings/template.html',
    directives: [ClearHistory],
})
export class SettingsPage extends BasePage {

    public version: string = '';
    public hideTrajectory: boolean;
    public hideOldBuses: boolean = false;
    private iman: ItineraryManager;

    public constructor(iman: ItineraryManager) {
        super();
        this.iman = iman;
    }

    public ionViewLoaded(): void {
        AppVersion.getVersionNumber().then(version => this.version = version);
        this.iman.isEnabled().then(value => this.hideTrajectory = !value);
    }

    public onHideTrajectoryChange(): void {
        this.iman.toggleItinerary(!this.hideTrajectory)
            .then(() => console.log('Toggled trajectory state.'));
    }
}
