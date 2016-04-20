'use strict';

import { Line } from '../models/itinerary';
import { History } from '../models/history';
import { SqlStorage } from 'ionic-angular';

export class HistoryDAO {
    
    private collectionName = 'history';
    private storage: SqlStorage;
    
    constructor() {
        this.storage = new SqlStorage();
    }
    
    private get Storage(): Promise<History[]> {
        return new Promise<History[]>((resolve) => {
            this.storage.get(this.collectionName).then((content: string) => {
                if(!content) resolve([]);
                else {
                    let list: any[] = JSON.parse(content);
                    let output: History[] = [];
                    list.forEach( data => {
                        let line: Line = new Line(data.line.line, data.line.description);
                        output.push(new History(line, new Date(data.timestamp)));
                    });
                    output = output.sort( (a, b) => b.Timestamp.getTime() - a.Timestamp.getTime() );
                    resolve(output);
                }
            });
        });
    }
    
    private set(objs: History[]): Promise<any> {
        return this.storage.set(this.collectionName, JSON.stringify(objs));
    }
    
    public save(obj: History): Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            this.Storage.then( (histories: History[]) => {
                let exists: boolean = histories.some( data => data.Line.Line === obj.Line.Line );
                if(exists) resolve(false);
                else {
                    histories.push(obj);
                    this.set(histories).then( () => resolve(true) );
                }
            });
        });
    }
    
    public remove(obj: History): Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            this.Storage.then( (histories: History[]) => {
                let exists: boolean = histories.some( data => data.Line.Line === obj.Line.Line );
                if(!exists) resolve(false);
                else {
                    let index: number = histories.findIndex( (history: History) => history.Line.Line === obj.Line.Line );
                    histories.splice(index, 1);
                    this.set(histories).then( () => resolve(true) );
                }
            });
        });
    }
    
    public getAll(): Promise<History[]> {
        return this.Storage;
    }
    
    public getLimited(size: number): Promise<History[]> {
        return this.getAll().then( histories => histories.splice(0, size) );
    }
}