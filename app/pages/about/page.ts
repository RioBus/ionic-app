'use strict';
import { Page } from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/about/template.html',
  directives: []
})
export class AboutPage {
    
    public get Title(): string {
        return 'Sobre o Rio Bus';
    }
    
    constructor() {}
}
