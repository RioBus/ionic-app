'use strict';

import { Line } from '../models/itinerary';
import { SqlStorage } from 'ionic-angular';

export class LinesDAO {

    private collectionName: string = 'lines';
    private storage: SqlStorage;

    public constructor() {
        this.storage = new SqlStorage();
    }

    private get Storage(): Promise<Line[]> {
        return new Promise<Line[]>((resolve) => {
            this.storage.get(this.collectionName).then((content: string) => {
                if (!content) resolve([]);
                else {
                    let list: any[] = JSON.parse(content);
                    let output: Line[] = [];
                    list.forEach(data => output.push(new Line(data.line, data.description)));
                    resolve(output);
                }
            });
        });
    }

    private set(objs: Line[]): Promise<void> {
        return this.storage.set(this.collectionName, JSON.stringify(objs));
    }

    public save(obj: Line): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Storage.then((lines: Line[]) => {
                let exists: boolean = lines.some(data => data.Line === obj.Line);
                if (exists) resolve(false);
                else {
                    lines.push(obj);
                    this.set(lines).then(() => resolve(true));
                }
            });
        });
    }

    public saveAll(lines: Line[]): Promise<void> {
        return this.set(lines);
    }

    public remove(obj: Line): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Storage.then((lines: Line[]) => {
                let exists: boolean = lines.some(data => data.Line === obj.Line);
                if (!exists) resolve(false);
                else {
                    let index: number = lines.findIndex((line: Line) => line.Line === obj.Line);
                    lines.splice(index, 1);
                    this.set(lines).then(() => resolve(true));
                }
            });
        });
    }

    public getAll(): Promise<Line[]> {
        return this.Storage;
    }

    public getLimited(limit: number, skip: number = 0): Promise<Line[]> {
        return this.getAll().then(lines => {
            return this.sort(lines).splice(skip, limit);
        });
    }

    private sort(items: Line[]): Line[] {
        return items.sort((a: Line, b: Line) => {
            if (!isNaN(parseInt(a.Line)) && !isNaN(parseInt(b.Line))) return (parseInt(a.Line) - parseInt(b.Line));
            else if (!isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return -1;
            else if (isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return 0;
            else return 1;
        });
    }
}
