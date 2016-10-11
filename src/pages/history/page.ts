import { Component } from '@angular/core';
import { History } from '../../models/history';
import { HistoryDAO } from '../../dao/history';
import { Analytics } from '../../core/analytics';
import strings from '../../strings';

/**
 * HistoryPage represents the view with information about the History os searches.
 * @class {HistoryPage}
 */
@Component({
    templateUrl: 'template.html',
})
export class HistoryPage {

    private items: any = {};

    public get Text(): any {
        return strings;
    }

    public constructor(private dao: HistoryDAO) {
        Analytics.trackView('HistoryPage');
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be presented.
     * @return {void}
     */
    public ionViewWillEnter(): void {
        document.getElementById('history-view').style.display = 'initial';
        this.loadHistories();
    }

    /**
     * Part of Ionic lifecycle. Runs when the view is about to be hidden.
     * @return {void}
     */
    public ionViewWillLeave(): void {
        document.getElementById('history-view').style.display = 'none';
    }

    /**
     * List of Dates which contains History of searches
     * @return {string[]}
     */
    public get Days(): string[] {
        return Object.keys(this.items);
    }

    /**
     * gets the Histories of one given day os searches.
     * @param {string} day - Day of the search
     * @return {History[]}
     */
    public getByDay(day: string): History[] {
        return this.items[day];
    }

    /**
     * @private
     * Loads the recorded History from the repository
     * @return {void}
     */
    private loadHistories(): void {
        this.dao.getAll().then(histories => {
            // arranging histories by day
            histories.forEach(history => {
                let day: string = `${history.Timestamp.getDate()}/${history.Timestamp.getMonth()}/${history.Timestamp.getFullYear()}`;
                if (!this.items[day]) this.items[day] = [];
                this.items[day].push(history);
            });
        });
    }
}
