'use strict';

import { Itinerary, Spot, ItineraryMap } from '../models/itinerary';
import { SqlStorage } from 'ionic-angular';

export class ItineraryDAO {

    private collectionName: string = 'itineraries';
    private storage: SqlStorage;

    constructor() {
        this.storage = new SqlStorage();
    }

    private get Storage(): Promise<ItineraryMap> {
        return new Promise<ItineraryMap>((resolve) => {
            this.storage.get(this.collectionName).then((content: string) => {
                if (!content) resolve(new ItineraryMap());
                else {
                    let data: any = JSON.parse(content);
                    let map: ItineraryMap = new ItineraryMap();
                    let lines: string[] = Object.keys(data.itineraries);
                    lines.forEach( line => {
                        let it: any = data.itineraries[line];
                        let spots: Spot[] = [];
                        it.spots.forEach(sp => spots.push(new Spot(sp.latitude, sp.longitude, sp.returning)));
                        map.save(new Itinerary(it.line, it.description, it.agency, spots));
                    });
                    resolve(map);
                }
            });
        });
    }

    private set(obj: ItineraryMap): Promise<void> {
        return this.storage.set(this.collectionName, JSON.stringify(obj));
    }

    public get(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>(resolve => this.Storage.then( map => resolve(map.get(line))));
    }

    public save(obj: Itinerary): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Storage.then((map: ItineraryMap) => {
                map.save(obj);
                this.set(map).then(() => resolve(true));
            });
        });
    }

    public remove(obj: Itinerary): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.Storage.then((map: ItineraryMap) => {
                map.remove(obj);
                this.set(map).then(() => resolve(true));
            });
        });
    }
}
