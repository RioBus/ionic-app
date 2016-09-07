import { Component } from '@angular/core';
import { BasePage } from '../../core/page';
import { Analytics } from '../../core/analytics';

/**
 * AboutPage represents the view with information about the app.
 * @class {AboutPage}
 */
@Component({
    templateUrl: 'build/pages/about/template.html',
    directives: [],
})
export class AboutPage extends BasePage {

    public constructor() {
        super();
        Analytics.trackView('AboutPage');
    }

    public get PageContent(): string {
        return this.Text.PAGE_ABOUT_CONTENT || '';
    }
}
