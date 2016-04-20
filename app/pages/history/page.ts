'use strict';
import { Page, Platform, NavController } from 'ionic-angular';
import { History } from '../../models/history';
import { MapPage } from '../map/page';
import { HistoryDAO } from '../../dao/history';
import { FilterHistoryPipe } from '../../pipes/filterHistory';

@Page({
  templateUrl: 'build/pages/history/template.html',
  pipes: [FilterHistoryPipe]
})
export class HistoryPage {
    
    private platform: Platform;
    private nav: NavController;
    private items: any = {};
    private show: any = {};
    private dao: HistoryDAO;
    
    public get Title(): string {
        return 'Histórico';
    }
    
    public get Days(): string[] {
        return Object.keys(this.items);
    }
    
    public get Items(): History[] {
        return this.items;
    }
    
    public constructor(platform: Platform, nav: NavController) {
        this.platform = platform;
        this.nav = nav;
        this.dao = new HistoryDAO();
    }
    
    public onPageLoaded(): void {}
    
    public onPageWillEnter(): void {
        this.loadHistories();
        document.getElementById('history-view').style.display = 'initial';
    }
    
    public onPageWillLeave(): void {
        document.getElementById('history-view').style.display = 'none';
    }
    
    public getDayHistories(day): History[] {
        return this.items[day] || [];
    }
    
    private loadHistories(): void {
        this.dao.getAll().then(histories => {
            // arranging histories by day
            histories.forEach( history => {
                let day: string = `${history.Timestamp.getDate()}/${history.Timestamp.getMonth()}/${history.Timestamp.getFullYear()}`;
                if(!this.items[day]) this.items[day] = [];
                this.show[day] = false;
                this.items[day].push(history); 
            });
        });
    }
    
    public toggleHistories(day: string) {
        console.log(`Clicked in the item '${day}'`);
        this.show[day] = !this.show[day];
    }
    
    public presentDay(day: string): boolean {
        return this.show[day];
    }
    
    public find(item: History): void {
        this.nav.push(MapPage, { line: item.Line });
    }
}
