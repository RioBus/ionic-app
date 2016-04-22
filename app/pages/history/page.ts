'use strict';
import { Page } from 'ionic-angular';
import { History } from '../../models/history';
import { HistoryDAO } from '../../dao/history';
import { HistoryDropdownList } from '../../components/history-dropdown-list/controller';

@Page({
    templateUrl: 'build/pages/history/template.html',
    directives: [HistoryDropdownList],
})
export class HistoryPage {

    private items: any = {};
    private dao: HistoryDAO;

    public get Title(): string {
        return 'Histórico';
    }

    public get Days(): string[] {
        return Object.keys(this.items);
    }

    public get Items(): any {
        return this.items;
    }

    public constructor() {
        this.dao = new HistoryDAO();
    }

    public onPageWillEnter(): void {
        document.getElementById('history-view').style.display = 'initial';
        this.loadHistories();
    }

    public onPageWillLeave(): void {
        document.getElementById('history-view').style.display = 'none';
    }

    public getByDay(day: string): History[] {
        return this.items[day];
    }

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
