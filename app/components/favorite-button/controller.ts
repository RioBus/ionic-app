'use strict';

import { Button, Icon } from 'ionic-angular';
import { Component } from 'angular2/core';
import { Line } from '../../models/itinerary';
import { FavoritesDAO } from '../../dao/favorites';

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

    public get IsFavorite(): boolean {
        return this.favorite;
    }

    constructor() {
        this.dao = new FavoritesDAO();
    }

    private ngOnInit(): void {
        this.favoriteCheck();
    }

    private favoriteCheck(): void {
        this.dao.getByLine(this.line.Line).then((line: Line) => this.favorite = !!line );
    }

    public onClick(): void {
        if (this.favorite) this.dao.remove(this.line).then((response: boolean) => this.onUnstar(response));
        else this.dao.save(this.line).then((response: boolean) => this.onStar(response));
    }

    private onStar(response: boolean): void {
        if (response) this.favorite = true;
        else console.log(`Failed to star the line '${this.line.Line}'`);
    }

    private onUnstar(response: boolean): void {
        if (response) this.favorite = false;
        else console.log(`Failed to unstar the line '${this.line.Line}'`);
    }
}