'use strict';

import { ItineraryService } from '../services/itinerary';
import { ItineraryDAO } from '../dao/itinerary';
import { Itinerary } from '../models/itinerary';
import { Injectable } from 'angular2/core';

@Injectable()
export class ItineraryManager {

    private service: ItineraryService;
    private dao: ItineraryDAO;

    public constructor(service: ItineraryService) {
        this.service = service;
        this.dao = new ItineraryDAO();
    }

    private downloadItinerary(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>(resolve => {
            this.service.getItinerary(line).then((data: Itinerary) =>
                this.dao.save(data).then(() => resolve(data) )
            );
        });
    }

    public getByLine(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>(resolve => {
            this.dao.get(line).then(it => {
                if (it) resolve(it);
                else this.downloadItinerary(line).then(dit => resolve(dit));
            });
        });
    }
}
