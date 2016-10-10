import { Strings } from './strings';

/**
 * BasePage class is the base controller for the pages.
 * It prepares all the resources used in the views. 
 * 
 * @class {BasePage}
 */
export class BasePage {

  private strings: any = {};

  public get Text(): any {
      return this.strings;
  }

  public constructor() {
    Strings.all().then( content => this.strings = content);
  }
}
