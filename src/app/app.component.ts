import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
import { DEFAULT_PAGE, MenuItem, DrawerLinks } from '../components';
import strings from '../strings';

@Component({
    templateUrl: 'app.template.html'
})
export class Application {
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) public nav: Nav;

    public rootPage: any = DEFAULT_PAGE;

    public get Text(): any {
        return strings;
    }

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    public pages: MenuItem[] = DrawerLinks;

    public constructor(platform: Platform) {
        platform.ready().then(() => this.onReady());
    }

    private onReady(): void {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
    }

    /**
     * Opens a given page
     * @param {MenuItem} page - Clicked page item
     * @return {void}
     */
    public openPage(page: MenuItem): void {
        if (page.component) {
            if (!page.home) this.nav.push(page.component);
            else this.rootPage = page.component;
        } else if (page.link) window.open(page.link, '_system');
        else if (page.action) page.action();
    }
}