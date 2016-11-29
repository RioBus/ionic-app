import { Component } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';
import { Analytics } from '../../core/analytics';
import strings from '../../strings';

/**
 * FavoritesPage class represents the view which displays information
 * about the favorite lines.
 * @class {FavoritesPage}
 */
@Component({
    templateUrl: 'template.html',
})
export class FavoritesPage {

    public items: Line[] = [];

    public get Text(): any {
        return strings;
    }

    public constructor(private dao: FavoritesDAO) {
        Analytics.trackView('FavoritesPage');
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be presented.
     * @return {void}
     */
    public ionViewWillEnter(): void {
        this.loadFavorites();
        document.getElementById('favorites-view').style.display = 'initial';
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be hidden.
     * @return {void}
     */
    public ionViewWillLeave(): void {
        document.getElementById('favorites-view').style.display = 'none';
    }

    /**
     * @private
     * Loads the favorites data from the memory to the view.
     * @return {void}
     */
    private loadFavorites(): void {
        this.dao.getAll().then(line => this.items = line);
    }
}
