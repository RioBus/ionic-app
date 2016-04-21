'use strict';

import { ItineraryService } from '../services/itinerary';
import { LinesDAO } from '../dao/lines';
import { Line } from '../models/itinerary';
import { Injectable } from 'angular2/core';

@Injectable()
export class LineManager {

    private service: ItineraryService;
    private dao: LinesDAO;

    public constructor(service: ItineraryService) {
        this.service = service;
        this.dao = new LinesDAO();
    }

    private downloadLines(): Promise<Line[]> {
        return new Promise<Line[]>(resolve => {
            this.service.getItineraries().then((lines: Line[]) => {
                this.dao.saveAll(lines).then(() => {
                    resolve(lines);
                });
            });
        });
    }

    public getAll(): Promise<Line[]> {
        return new Promise<Line[]>(resolve => {
            this.dao.getAll().then(daoLines => {
                if (daoLines.length > 0)
                    resolve(daoLines);
                else
                    this.downloadLines().then(downloadedLines => resolve(downloadedLines));
            });
        });
    }

    public getSlice(limit: number, skip: number): Promise<Line[]> {
        return new Promise<Line[]>(resolve => {
            this.dao.getLimited(limit, skip).then( lines => {
                if (lines.length > 0) resolve(lines);
                else this.downloadLines().then( downloadedLines => resolve(downloadedLines.splice(skip, limit)) );
            });
        });
    }
}
