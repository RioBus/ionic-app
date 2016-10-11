import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Line } from '../../models/itinerary';
import { History } from '../../models/history';
import { FavoritesDAO } from '../../dao/favorites';
import { HistoryDAO } from '../../dao/history';
import { LineManager } from '../../managers/line';
import { Analytics } from '../../core/analytics';
import { Keyboard } from 'ionic-native';
import { FEED_SLICE_LIMIT } from '../../const';
import strings from '../../strings';
/**
 * SearchPage represents the search view in the app.
 * @class {SearchPage}
 */
@Component({
    templateUrl: 'template.html',
})
export class SearchPage {

    private skip: number = 0;
    private itemsBkp: Line[] = [];
    private favorites: Line[] = [];
    public items: Line[] = [];
    public histories: History[] = [];

    public showSearchBox: boolean = false;

    public get Text(): any {
        return strings;
    }

    public constructor(private nav: NavController, private manager: LineManager, private hdao: HistoryDAO, private fdao: FavoritesDAO) {
        Analytics.trackView('SearchPage');
    }

    /**
     * Checks if the given line is favorite.
     * @param {string} line - line identifier
     * @return {boolean}
     */
    public isFavorite(line: Line): boolean {
        return this.favorites.some(fav => line.Line === fav.Line);
    }

    /**
     * ion-input#searchbox
     * return {any}
     */
    public get searchBox(): any {
        let element: any = document.getElementById('searchbox');
        if (element) element = element.getElementsByTagName('input');
        if (element) element = element.item(0);
        return (element) ? element : null;
    }

    /**
     * Part of Ionic lifecycle. Runs when the view was just presented.
     * @return {void}
     */
    public ionViewDidLoad(): void {
        this.loadRecents();
        this.loadLines();
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be presented.
     * @return {void}
     */
    public ionViewWillEnter(): void {
        document.getElementById('search-view').style.display = 'initial';
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be hidden.
     * @return {void}
     */
    public ionViewWillLeave(): void {
        document.getElementById('search-view').style.display = 'none';
    }

    /**
     * Handles the event triggered when there is a new input in the searchbox.
     * @param {Event} event - triggered event
     * @return {void}
     */
    public onSubmit(event: Event): void {
        Analytics.trackEvent('searchbox', 'submit');
        let query: string = this.searchBox.value;
        if (query.length > 0) {
            if (this.itemsBkp.length === 0) this.itemsBkp = this.items;
            this.manager.getAll().then(lines => {
                this.items = lines.filter(
                    (value: Line): boolean =>
                        value.Line.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                        value.Description.toLowerCase().indexOf(query.toLowerCase()) > -1
                );
                if (this.items.length === 0)
                    this.items.push(new Line(query, this.Text.PAGE_SEARCH_SEARCHFOR));
            });
        } else {
            this.items = this.itemsBkp;
            this.itemsBkp = [];
        }
    }

    /**
     * Displays the searchbox
     * @return {void}
     */
    public showSearchBar(): void {
        Analytics.trackEvent('searchbox', 'show');
        this.showSearchBox = true;
        setTimeout(() => {
            this.searchBox.focus();
            Keyboard.show();
        }, 1);
    }

    /**
     * Hides the searchbox
     * @return {void}
     */
    public hideSearchBar(): void {
        Analytics.trackEvent('searchbox', 'hide');
        if (this.searchBox.value.length > 0) {
            this.searchBox.value = '';
            this.onSubmit(null);
        }
        this.showSearchBox = false;
    }

    /**
     * Loads the recent queries
     * @return {void}
     */
    private loadRecents(): void {
        this.hdao.getLimited(2).then(histories => this.histories = histories);
    }

    /**
     * Loads all lines
     * @return {void}
     */
    public loadLines(infiniteScroll?: any): void {
        if (this.showSearchBox) {
            if (infiniteScroll) infiniteScroll.complete();
            return;
        }
        this.manager.getSlice(FEED_SLICE_LIMIT, this.skip).then(lines => {
            this.items = this.items.concat(lines);
            this.skip += FEED_SLICE_LIMIT;
            if (infiniteScroll) infiniteScroll.complete();
        });
    }
}
