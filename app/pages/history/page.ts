import { Component } from '@angular/core';
import { History } from '../../models/history';
import { HistoryDAO } from '../../dao/history';
import { HistoryDropdownList } from '../../components/history-dropdown-list/controller';
import { BasePage } from '../../core/page';
import { Analytics } from '../../core/analytics';

/**
 * HistoryPage represents the view with information about the History os searches.
 * @class {HistoryPage}
 */
@Component({
    templateUrl: 'build/pages/history/template.html',
    directives: [HistoryDropdownList],
})
export class HistoryPage extends BasePage {

    private items: any = {};
    private dao: HistoryDAO;

    public constructor() {
        super();
        this.dao = new HistoryDAO();
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
