import { SearchPage } from './pages/search/page';
import { FavoritesPage } from './pages/favorites/page';
import { HistoryPage } from './pages/history/page';
import { AboutPage } from './pages/about/page';
import { SettingsPage } from './pages/settings/page';
import { FEEDBACK_MAIL, FEEDBACK_SUBJECT, URL_FB_PAGE, URL_PLAY_STORE } from './const';

export const DEFAULT_PAGE: any = SearchPage;

export const Components: any = [
    SearchPage,
    FavoritesPage,
    HistoryPage,
    AboutPage,
    SettingsPage
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
    { title: 'Favorites', icon: 'star', component: FavoritesPage },
    { title: 'History', icon: 'time', component: HistoryPage },
    { title: 'Send feedback', icon: 'chatboxes', link: `mailto:${FEEDBACK_MAIL}?subject=${FEEDBACK_SUBJECT}` },
    { title: 'About', icon: 'help-circle', component: AboutPage },
    { title: 'Rate the app', icon: 'appstore', link: URL_PLAY_STORE },
    { title: 'Like in Facebook', icon: 'thumbs-up', link: URL_FB_PAGE },
    { title: 'Settings', icon: 'settings', component: SettingsPage },
];