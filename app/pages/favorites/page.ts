import { Component } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';
import { FavoriteButton } from '../../components/favorite-button/controller';
import { LineItem } from '../../components/line-item/controller';
import { BasePage } from '../../core/page';

/**
 * FavoritesPage class represents the view which displays information
 * about the favorite lines.
 * @class {FavoritesPage}
 */
@Component({
    templateUrl: 'build/pages/favorites/template.html',
    directives: [FavoriteButton, LineItem],
})
export class FavoritesPage extends BasePage {

    public items: Line[] = [];
    private dao: FavoritesDAO;

    public constructor() {
        super();
        this.dao = new FavoritesDAO();
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
