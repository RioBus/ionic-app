'use strict';
import { API_ENDPOINT } from '../const';
import { Bus } from '../models/bus';
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class SearchService {
    
    private http: Http;
    
    constructor(http: Http) {
        this.http = http;
    }

    private processBuses(obj: any[]): Bus[] {
        let result: Bus[] = [];
        obj.forEach((data) => {
            result.push(new Bus(data.line, data.order, data.speed, data.direction, data.latitude, data.longitude, data.sense, data.timeStamp));
        });
        return result;
    }
    
    public getBuses(query: string): Promise<Bus[]> {
        return new Promise<Bus[]>((resolve, reject) => {
            let url: string = `${API_ENDPOINT}/v3/search/${query}`;
            this.http.get(url).subscribe(
                data => resolve( this.processBuses( data.json() ) ),
                error => reject(error)
            );
        });
    }
}