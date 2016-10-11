import { Component } from '@angular/core';
import { Analytics } from '../../core/analytics';
import strings from '../../strings';

/**
 * AboutPage represents the view with information about the app.
 * @class {AboutPage}
 */
@Component({
    templateUrl: 'template.html',
})
export class AboutPage {

    public get Text(): any {
        return strings;
    }

    public constructor() {
        Analytics.trackView('AboutPage');
    }
}
