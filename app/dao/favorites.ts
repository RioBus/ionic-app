'use strict';

import { Line } from '../models/itinerary';
import { SqlStorage } from 'ionic-angular';

export class FavoritesDAO {
    
    private collectionName = 'favorites';
    private storage: SqlStorage;
    
    constructor() {
        this.storage = new SqlStorage();
    }
    
    private get Storage(): Promise<Line[]> {
        return new Promise<Line[]>((resolve) => {
            this.storage.get(this.collectionName).then((content: string) => {
                if(!content) resolve([]);
                else {
                    let list: any[] = JSON.parse(content);
                    let output: Line[] = [];
                    list.forEach( data => output.push(new Line(data.line, data.description)) );
                    resolve(output);
                }
            });
        });
    }
    
    private set(objs: Line[]): Promise<any> {
        return this.storage.set(this.collectionName, JSON.stringify(objs));
    }
    
    public save(obj: Line): Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            this.Storage.then( (lines: Line[]) => {
                let exists: boolean = lines.some( data => data.Line === obj.Line );
                if(exists) resolve(false);
                else {
                    lines.push(obj);
                    this.set(lines).then( () => resolve(true) );
                }
            });
        });
    }
    
    public remove(obj: Line): Promise<boolean> {
        return new Promise<boolean>( (resolve, reject) => {
            this.Storage.then( (lines: Line[]) => {
                let exists: boolean = lines.some( data => data.Line === obj.Line );
                if(!exists) resolve(false);
                else {
                    let index: number = lines.findIndex( (line: Line) => line.Line === obj.Line );
                    lines.splice(index, 1);
                    this.set(lines).then( () => resolve(true) );
                }
            });
        });
    }
    
    public getByLine(line: string): Promise<Line> {
        return this.Storage.then((lines: Line[]) => {
            if(lines.length>0) {
                for(let i=0; i<lines.length; i++) {
                    let tmp: Line = lines[i];
                    if(tmp.Line === line) return tmp;
                }
            }
            return null;
        });
    }
    
    public getAll(): Promise<Line[]> {
        return this.Storage;
    }
}