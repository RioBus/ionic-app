import {FavoriteButton} from './components/favorite-button/controller';
import {HistoryDropdownList} from './components/history-dropdown-list/controller';
import {LineItem} from './components/line-item/controller';
import {MapSnackbar} from './components/map-snackbar/controller';
import {GoogleMapsComponent} from './components/maps/controller';
import {FEEDBACK_MAIL, FEEDBACK_SUBJECT, URL_FB_PAGE, URL_PLAY_STORE} from './const';
import {AboutPage} from './pages/about/page';
import {FavoritesPage} from './pages/favorites/page';
import {HistoryPage} from './pages/history/page';
import {MapPage} from './pages/map/page';
import {SearchPage} from './pages/search/page';
import {SettingsPage} from './pages/settings/page';
import strings from './strings';

export const DEFAULT_PAGE: any = SearchPage;

export const Components: any = [
    SearchPage,
    FavoritesPage,
    HistoryPage,
    MapPage,
    AboutPage,
    SettingsPage,
    FavoriteButton,
    HistoryDropdownList,
    LineItem,
    MapSnackbar,
    GoogleMapsComponent,
];

export interface MenuItem {
    title: string;
    icon: string;
    component?: any;
    link?: string;
    action?: Function;
    home?: boolean;
}

export const DrawerLinks: MenuItem[] = [
    { title: strings.MENU_OPTION_FAVORITES, icon: 'star', component: FavoritesPage },
    { title: strings.MENU_OPTION_HISTORY, icon: 'time', component: HistoryPage },
    { title: strings.MENU_OPTION_FEEDBACK, icon: 'chatboxes', link: `mailto:${FEEDBACK_MAIL}?subject=${FEEDBACK_SUBJECT}` },
    { title: strings.MENU_OPTION_ABOUT, icon: 'help-circle', component: AboutPage },
    { title: strings.MENU_OPTION_RATE, icon: 'appstore', link: URL_PLAY_STORE },
    { title: strings.MENU_OPTION_LIKE, icon: 'thumbs-up', link: URL_FB_PAGE },
    { title: strings.MENU_OPTION_SETTINGS, icon: 'settings', component: SettingsPage },
];