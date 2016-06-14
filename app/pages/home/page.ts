import { Component } from '@angular/core';
import { BasePage } from '../../core/page';

/**
 * HomePage class is the Home view controller
 * 
 * @class {HomePage}
 */
@Component({
  templateUrl: 'build/pages/home/template.html',
})
export class HomePage extends BasePage {

  public constructor() {
    super();
  }
}
