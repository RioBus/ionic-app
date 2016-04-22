'use strict';
import { Page } from 'ionic-angular';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';
import { FavoriteButton } from '../../components/favorite-button/controller';
import { LineItem } from '../../components/line-item/controller';

@Page({
    templateUrl: 'build/pages/favorites/template.html',
    directives: [FavoriteButton, LineItem],
})
export class FavoritesPage {

    private items: Line[] = [];
    private dao: FavoritesDAO;

    public get Title(): string {
        return 'Favoritos';
    }

    public get Items(): Line[] {
        return this.items;
    }

    public constructor() {
        this.dao = new FavoritesDAO();
    }

    public onPageWillEnter(): void {
        this.loadFavorites();
        document.getElementById('favorites-view').style.display = 'initial';
    }

    public onPageWillLeave(): void {
        document.getElementById('favorites-view').style.display = 'none';
    }

    private loadFavorites(): void {
        this.dao.getAll().then(line => this.items = line);
    }
}
