import { HIDE_OLD_BUSES_KEY, HIDE_TRAJECTORY_KEY } from '../../const';
import { PreferencesManager } from '../../managers/preferences';
import { AppVersion } from 'ionic-native';
import { Component } from '@angular/core';
import { Analytics } from '../../core/analytics';
import strings from '../../strings';

/**
 * SettingsPage represents the view with app's configurations.
 * @class {SettingsPage}
 */
@Component({
    templateUrl: 'template.html',
})
export class SettingsPage {

    public version: string = '';
    public hideTrajectory: boolean;
    public hideOldBuses: boolean;

    public get Text(): any {
        return strings;
    }

    public constructor(private preferences: PreferencesManager) {
        Analytics.trackView('SettingsPage');
    }

    /**
     * It's part of Ionic lifecylce. Method called when the view is about
     * to be presented.
     * @return {void}
     */
    public ionViewDidLoad(): void {
        AppVersion.getVersionNumber().then(version => this.version = version);
        this.preferences.getKey<boolean>(HIDE_TRAJECTORY_KEY).then(value => this.hideTrajectory = !!value);
        this.preferences.getKey<boolean>(HIDE_OLD_BUSES_KEY).then(value => this.hideOldBuses = !!value);
    }

    /**
     * Called when the trajectory display state toggle changes it's state.
     * @return {void}
     */
    public onHideTrajectoryChange(): void {
        Analytics.trackEvent('trajectory switch', 'toggle', `${this.hideTrajectory}`);
        this.preferences.setKey(HIDE_TRAJECTORY_KEY, this.hideTrajectory)
            .then(() => console.log('Toggled trajectory state.'));
    }

    /**
     * Called when the old buses display state toggle changes it's state.
     * @return {void}
     */
    public onHideOldBusesChange(): void {
        Analytics.trackEvent('old buses switch', 'toggle', `${this.hideOldBuses}`);
        this.preferences.setKey(HIDE_OLD_BUSES_KEY, this.hideOldBuses)
            .then(() => console.log('Toggled old buses display state.'));
    }
}
