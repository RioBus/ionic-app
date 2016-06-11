'use strict';

import { Component } from '@angular/core';

@Component({
    templateUrl: 'build/pages/about/template.html',
    directives: [],
})
export class AboutPage {

    public get Title(): string {
        return 'Sobre o Rio Bus';
    }
}
