import { API_ENDPOINT } from '../const';
import { Bus } from '../models/bus';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * SearchService class handles the requests to retrieve buses information from the
 * external API provider.
 * @class {SearchService}
 */
@Injectable()
export class SearchService {

    private http: Http;

    public constructor(http: Http) {
        this.http = http;
    }

    /**
     * @private
     * Preprocesses the received bus data to turn into an Bus instance array.
     * @param {any[]} obj - received data
     * @return {Bus[]}
     */
    private processBuses(obj: any[]): Bus[] {
        let result: Bus[] = [];
        obj.forEach((data) => {
            result.push(new Bus(data.line, data.order, data.speed, data.direction, data.latitude, data.longitude, data.sense, data.timeStamp));
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
            let url: string = `${API_ENDPOINT}/v3/search/${query}`;
            this.http.get(url).subscribe(
                data => resolve(this.processBuses(data.json())),
                error => reject(error)
            );
        });
    }
}
