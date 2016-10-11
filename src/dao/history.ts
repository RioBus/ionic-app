import { Line } from '../models/itinerary';
import { History } from '../models/history';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/**
 * HistoryDAO class is responsible for saving and retrieving
 * information from history searches from the memory.
 * 
 * @class {HistoryDAO}
 */
@Injectable()
export class HistoryDAO {

    private collectionName: string = 'history';

    public constructor(private storage: Storage) {}

    /**
     * @private
     * Retrieves all the searches stored in the memory.
     * @return {Promise<History[]>}
     */
    private get Storage(): Promise<History[]> {
        return new Promise<History[]>((resolve) => {
            this.storage.get(this.collectionName).then((content: string) => {
                if (!content) resolve([]);
                else {
                    let list: any[] = JSON.parse(content);
                    let output: History[] = [];
                    list.forEach(data => {
                        let line: Line = new Line(data.line.line, data.line.description);
                        output.push(new History(line, new Date(data.timestamp), data.timesSearched));
                    });
                    resolve(this.sort(output));
                }
            });
        });
    }

    /**
     * @private
     * Saves an array os histories to the memory.
     * @param {History[]} objs - array of History objects
     * @return {Promise<any>}
     */
    private set(objs: History[]): Promise<any> {
        return this.storage.set(this.collectionName, JSON.stringify(objs));
    }

    /**
     * Saves an History instance to the memory
     * @param {History} obj - History instance
     * @return {Promise<boolean>}
     */
    public save(obj: History): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Storage.then((histories: History[]) => {
                let tmpDate: Date = new Date();
                let index: number = histories.findIndex(data =>
                    data.Line.Line === obj.Line.Line &&
                    data.Timestamp.getDate() === tmpDate.getDate() &&
                    data.Timestamp.getMonth() === tmpDate.getMonth() &&
                    data.Timestamp.getFullYear() === tmpDate.getFullYear()
                );
                if (index > -1) histories[index].incrementCounter();
                else histories.push(obj);
                this.set(histories).then(() => resolve(true));
            });
        });
    }

    /**
     * Removes a History instance from the memory
     * @param {History} obj - History instance
     * @return {Promise<boolean>}
     */
    public remove(obj: History): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Storage.then((histories: History[]) => {
                let exists: boolean = histories.some(data => data.Line.Line === obj.Line.Line);
                if (!exists) resolve(false);
                else {
                    let index: number = histories.findIndex((history: History) => history.Line.Line === obj.Line.Line);
                    histories.splice(index, 1);
                    this.set(histories).then(() => resolve(true));
                }
            });
        });
    }

    /**
     * Removes all History instances from the memory
     * @return {Promise<void>}
     */
    public clear(): Promise<void> {
        return this.set([]);
    }

    /**
     * Retrieves all the history data stored in the memory.
     * @return {Promise<History[]>}
     */
    public getAll(): Promise<History[]> {
        return this.Storage;
    }

    /**
     * Retrieves a limited slice of data from the memory
     * @param {number} size - number of History instances to retrieve
     * @return {Promise<History[]>}
     */
    public getLimited(size: number): Promise<History[]> {
        return this.Storage.then(histories => histories.splice(0, size));
    }

    /**
     * @private
     * Sorts the History array based on timestamp
     * @param {History[]} histories - Array of History
     * @return {History[]}
     */
    private sort(histories: History[]): History[] {
        return histories.sort((a, b) => {
            let newer: number = b.Timestamp.getTime() - a.Timestamp.getTime();
            newer = newer && newer / Math.abs(newer);
            let heavier: number = b.count - a.count;
            return newer + heavier;
        });
    }
}
