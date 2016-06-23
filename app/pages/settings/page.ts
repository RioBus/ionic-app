import { Component } from '@angular/core';
import { AppVersion } from 'ionic-native';
import { BasePage } from '../../core/page';

/**
 * SettingsPage represents the view with app's configurations.
 * @class {SettingsPage}
 */
@Component({
    templateUrl: 'build/pages/settings/template.html',
    directives: [],
})
export class SettingsPage extends BasePage {

    public version: string = '';
    public hideTrajectory: boolean = false;
    public hideOldBuses: boolean = false;

    public constructor() {
        super();
        AppVersion.getVersionNumber().then(version => this.version = version);
    }
}
