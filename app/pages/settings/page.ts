import { HIDE_OLD_BUSES_KEY, HIDE_TRAJECTORY_KEY } from '../../const';
import { PreferencesManager } from '../../managers/preferences';
import { ClearHistory } from '../../components/clear-history/controller';
import { AppVersion } from 'ionic-native';
import { Component } from '@angular/core';
import { BasePage } from '../../core/page';

/**
 * SettingsPage represents the view with app's configurations.
 * @class {SettingsPage}
 */
@Component({
    templateUrl: 'build/pages/settings/template.html',
    directives: [ClearHistory],
})
export class SettingsPage extends BasePage {

    private preferences: PreferencesManager;

    public version: string = '';
    public hideTrajectory: boolean;
    public hideOldBuses: boolean;

    public constructor(prefs: PreferencesManager) {
        super();
        this.preferences = prefs;
    }

    /**
     * It's part of Ionic lifecylce. Method called when the view is about
     * to be presented.
     * @return {void}
     */
    public ionViewLoaded(): void {
        AppVersion.getVersionNumber().then(version => this.version = version);
        this.preferences.getKey<boolean>(HIDE_TRAJECTORY_KEY).then(value => this.hideTrajectory = !!value);
        this.preferences.getKey<boolean>(HIDE_OLD_BUSES_KEY).then(value => this.hideOldBuses = !!value);
    }

    /**
     * Called when the trajectory display state toggle changes it's state.
     * @return {void}
     */
    public onHideTrajectoryChange(): void {
        this.preferences.setKey(HIDE_TRAJECTORY_KEY, this.hideTrajectory)
            .then(() => console.log('Toggled trajectory state.'));
    }

    /**
     * Called when the old buses display state toggle changes it's state.
     * @return {void}
     */
    public onHideOldBusesChange(): void {
        this.preferences.setKey(HIDE_OLD_BUSES_KEY, this.hideOldBuses)
            .then(() => console.log('Toggled old buses display state.'));
    }
}
