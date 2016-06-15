import { Button, Icon } from 'ionic-angular';
import { Component } from '@angular/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';

/**
 * Represents the <favorite-button> HTML component.
 * @class {FavoriteButton}
 */
@Component({
    selector: 'favorite-button',
    templateUrl: 'build/components/favorite-button/template.html',
    inputs: ['line', 'size'],
    directives: [Button, Icon],
})
export class FavoriteButton {

    private line: Line;
    public size: string;
    private favorite: boolean = false;
    private dao: FavoritesDAO;

    public constructor() {
        this.dao = new FavoritesDAO();
    }

    public get IsFavorite(): boolean {
        return this.favorite;
    }

    /**
     * It's part of Angular2 lifecycle. It runs when the view is initialized.
     * @return {void}
     */
    public ngOnInit(): void {
        this.favoriteCheck();
    }

    /**
     * @private
     * Checks if the given line is favorite or not.
     * @return {void}
     */
    private favoriteCheck(): void {
        this.dao.getByLine(this.line.Line).then((line: Line) => this.favorite = !!line );
    }

    /**
     * Handles the event for when the user clicks over the star button
     * @return {void}
     */
    public onClick(): void {
        if (this.favorite) this.dao.remove(this.line).then((response: boolean) => this.onUnstar(response));
        else this.dao.save(this.line).then((response: boolean) => this.onStar(response));
    }

    /**
     * @private
     * Event for when the user is trying to star a line
     * @param {boolean} response - response from the operation
     * @return {void}
     */
    private onStar(response: boolean): void {
        if (response) this.favorite = true;
        else console.log(`Failed to star the line '${this.line.Line}'`);
    }

    /**
     * @private
     * Event for when the user is trying to unstar a line
     * @param {boolean} response - response from the operation
     * @return {void}
     */
    private onUnstar(response: boolean): void {
        if (response) this.favorite = false;
        else console.log(`Failed to unstar the line '${this.line.Line}'`);
    }
}
