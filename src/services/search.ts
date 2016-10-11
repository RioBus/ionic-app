import { API_ENDPOINT, HIDE_OLD_BUSES_KEY, OLD_BUS_LIMIT } from '../const';
import { PreferencesManager } from '../managers/preferences';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Bus } from '../models/bus';

/**
 * SearchService class handles the requests to retrieve buses information from the
 * external API provider.
 * @class {SearchService}
 */
@Injectable()
export class SearchService {

    public constructor(private http: Http, private preferences: PreferencesManager) {}

    /**
     * @private
     * Preprocesses the received bus data to turn into an Bus instance array.
     * @param {any[]} obj - received data
     * @param {boolean} hideOldies - Toggle hide old buses on/off
     * @return {Bus[]}
     */
    private processBuses(obj: any[], hideOldies: boolean): Bus[] {
        let result: Bus[] = [];
        obj.forEach(data => {
            let tmp: Bus = new Bus(data.line, data.order, data.speed, data.direction, data.latitude, data.longitude, data.sense, data.timeStamp);

            if (hideOldies) {
                let timeSinceUpdate: number = ((new Date()).getTime() - tmp.Timestamp.getTime()) / 60000; // to minutes
                if (timeSinceUpdate < OLD_BUS_LIMIT) result.push(tmp);
            } else
                result.push(tmp);
        });
        return result;
    }

    /**
     * Retrieves the list of Bus instances from the external API for the given search query
     * @param {string} query - Query for the search for the buses
     * @return {Promise<Bus[]>}
     */
    public getBuses(query: string): Promise<Bus[]> {
        return new Promise<Bus[]>((resolve, reject) => {
            this.preferences.getKey<boolean>(HIDE_OLD_BUSES_KEY)
                    .then(hideOldies =>
                        this.http.get(`${API_ENDPOINT}/v3/search/${query}`).subscribe(
                            data => resolve(this.processBuses(data.json(), !!hideOldies))),
                            error => reject(error)
                        );
        });
    }
}
