import { Events } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';
import { Analytics } from '../../core/analytics';

/**
 * Represents the <favorite-button> HTML component.
 * @class {FavoriteButton}
 */
@Component({
    selector: 'favorite-button',
    templateUrl: 'template.html',
})
export class FavoriteButton {

    @Input() public line: Line;
    @Input() public size: string;
    private favorites: Line[];

    private static isBusy: boolean = false;

    public constructor(private events: Events, private dao: FavoritesDAO) {
        this.favorites = [];
        this.updateState();
        this.events.subscribe('update:favorites', () => this.updateState());
    }

    public isFavorite(): boolean {
        return this.favorites.some(favorite => favorite.Line === this.line.Line) || false;
    }

    /**
     * @private
     * Updates the favorite list state.
     * @return {void}
     */
    private updateState(): void {
        this.dao.getAll().then(favorites => this.favorites = favorites);
    }

    /**
     * Handles the event for when the user clicks over the star button
     * @return {void}
     */
    public onClick(): void {
        if (!FavoriteButton.isBusy) {
            FavoriteButton.isBusy = true;
            if (this.isFavorite()) this.dao.remove(this.line).then((response: boolean) => this.onUnstar(response));
            else this.dao.save(this.line).then((response: boolean) => this.onStar(response));
        }
    }

    /**
     * @private
     * Event for when the user is trying to star a line
     * @param {boolean} response - response from the operation
     * @return {void}
     */
    private onStar(response: boolean): void {
        console.log('Starring...');
        Analytics.trackEvent('Favorite button', 'star', 'add to favorites');
        if (response) this.events.publish('update:favorites'); // Triggers 'update:favorites' event
        else console.log(`Failed to star the line '${this.line.Line}'`);
        FavoriteButton.isBusy = false;
    }

    /**
     * @private
     * Event for when the user is trying to unstar a line
     * @param {boolean} response - response from the operation
     * @return {void}
     */
    private onUnstar(response: boolean): void {
        console.log('Unstarring...');
        Analytics.trackEvent('Favorite button', 'unstar', 'remove from favorites');
        if (response) this.events.publish('update:favorites'); // Triggers 'update:favorites' event
        else console.log(`Failed to unstar the line '${this.line.Line}'`);
        FavoriteButton.isBusy = false;
    }
}
