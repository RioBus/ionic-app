import { Line } from '../models/itinerary';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/**
 * FavoritesDAO class is responsible for saving and retrieving
 * information from favorite lines from the memory.
 * 
 * @class {FavoritesDAO}
 */
@Injectable()
export class FavoritesDAO {

    private collectionName: string = 'favorites';

    public constructor(private storage: Storage) {}

    /**
     * @private
     * Retrieves all the lines stored in the memory.
     * @return {Promise<Line[]>}
     */
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

    /**
     * @private
     * Saves an array os lines to the memory.
     * @param {Line[]} objs - array of Line objects
     * @return {Promise<any>}
     */
    private set(objs: Line[]): Promise<any> {
        return this.storage.set(this.collectionName, JSON.stringify(objs));
    }

    /**
     * Saves an Line instance to the memory
     * @param {Line} obj - Line instance
     * @return {Promise<boolean>}
     */
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

    /**
     * Removes a favorite Line instance from the memory
     * @param {Line} obj - Favorite Line instance
     * @return {Promise<boolean>}
     */
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

    /**
     * Retrieves one line stored in the memory identified by it's line code.
     * @param {string} line - line identifier
     * @return {Promise<Line>}
     */
    public getByLine(line: string): Promise<Line> {
        return this.Storage.then((lines: Line[]) => {
            if (lines.length > 0) {
                for (let i: number = 0; i < lines.length; i++) {
                    let tmp: Line = lines[i];
                    if (tmp.Line === line) return tmp;
                }
            }
            return null;
        });
    }

    /**
     * Retrieves all the lines stored in the memory.
     * @return {Promise<Line[]>}
     */
    public getAll(): Promise<Line[]> {
        return this.Storage;
    }
}
