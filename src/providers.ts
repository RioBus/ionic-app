import {Toast} from './core/toast';
import {PreferencesManager} from './managers/preferences';
import {LineManager} from './managers/line';
import {ItineraryManager} from './managers/itinerary';
import {SearchService} from './services/search';
import {ItineraryService} from './services/itinerary';


export const Providers: any = [
    ItineraryService,
    SearchService,
    ItineraryManager,
    LineManager,
    PreferencesManager,
    Toast
];