'use strict';
import { Component } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';
import { FavoriteButton } from '../../components/favorite-button/controller';
import { LineItem } from '../../components/line-item/controller';

@Component({
    templateUrl: 'build/pages/favorites/template.html',
    directives: [FavoriteButton, LineItem],
})
export class FavoritesPage {

    private items: Line[] = [];
    private dao: FavoritesDAO;

    public constructor() {
        this.dao = new FavoritesDAO();
    }

    public get Title(): string {
        return 'Favoritos';
    }

    public get Items(): Line[] {
        return this.items;
    }

    public ionViewWillEnter(): void {
        this.loadFavorites();
        document.getElementById('favorites-view').style.display = 'initial';
    }

    public ionViewWillLeave(): void {
        document.getElementById('favorites-view').style.display = 'none';
    }

    private loadFavorites(): void {
        this.dao.getAll().then(line => this.items = line);
    }
}
