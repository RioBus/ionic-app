import {PreferencesDAO} from './dao/preferences';
import {LinesDAO} from './dao/lines';
import {HistoryDAO} from './dao/history';
import {FavoritesDAO} from './dao/favorites';
import {Toast} from './core/toast';
import {ItineraryDAO} from './dao/itinerary';
import {ItineraryManager} from './managers/itinerary';
import {LineManager} from './managers/line';
import {PreferencesManager} from './managers/preferences';
import {ItineraryService} from './services/itinerary';
import {SearchService} from './services/search';

export const Providers: any = [
    ItineraryService,
    SearchService,
    ItineraryManager,
    LineManager,
    PreferencesManager,
    Toast,
    ItineraryDAO,
    FavoritesDAO,
    HistoryDAO,
    LinesDAO,
    PreferencesDAO,
];