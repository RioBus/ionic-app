import { Line } from '../models/itinerary';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/**
 * LinesDAO class is responsible for saving and retrieving
 * information about Lines from the memory.
 * 
 * @class {LinesDAO}
 */
@Injectable()
export class LinesDAO {

    private collectionName: string = 'lines';

    public constructor(private storage: Storage) {}

    /**
     * @private
     * Retrieves all the Lines stored in the memory.
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
     * Saves a list of lines to the memory.
     * @param {Line[]} objs - array of Line instances
     * @return {Promise<void>}
     */
    private set(objs: Line[]): Promise<void> {
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
     * Overwrites the Line memory with a new set of Lines.
     * @param {Line[]} lines - Line array
     * @return {Promise<void>}
     */
    public saveAll(lines: Line[]): Promise<void> {
        return this.set(lines);
    }

    /**
     * Removes a Lin instance from the memory
     * @param {Line} obj - Line instance
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
     * Retrieves all the Line data stored in the memory.
     * @return {Promise<Line[]>}
     */
    public getAll(): Promise<Line[]> {
        return this.Storage;
    }

    /**
     * Retrieves a limited slice of data from the memory
     * @param {number} size - number of Line instances to retrieve
     * @param {number} skip - number of Line instances to skip in the beginning of the search
     * @return {Promise<Line[]>}
     */
    public getLimited(limit: number, skip: number = 0): Promise<Line[]> {
        return this.getAll().then(lines => {
            return this.sort(lines).splice(skip, limit);
        });
    }

    /**
     * @private
     * Sorts the Line array based on line identifier
     * @param {Line[]} items - Array of Line
     * @return {Line[]}
     */
    private sort(items: Line[]): Line[] {
        return items.sort((a: Line, b: Line) => {
            if (!isNaN(parseInt(a.Line)) && !isNaN(parseInt(b.Line))) return (parseInt(a.Line) - parseInt(b.Line));
            else if (!isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return -1;
            else if (isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return 0;
            else return 1;
        });
    }
}
