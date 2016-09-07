import { GoogleAnalytics } from 'ionic-native';
import { ANALYTICS_UA, DEBUG_MODE } from '../const';

/**
 * Analytics driver API abstraction. 
 * 
 * @class Analytics
 */
export class Analytics {

    /**
     * Configures Analytics driver
     * 
     * @static
     * @returns {Promise<void>}
     */
    public static configure(): Promise<void> {
        return GoogleAnalytics.startTrackerWithId(ANALYTICS_UA)
            .then(() => GoogleAnalytics.enableUncaughtExceptionReporting(true), console.error)
            .then(() => { if (DEBUG_MODE) GoogleAnalytics.debugMode(); }, console.error);
    }

    /**
     * Track a screen
     *
     * @param {string}  title        - Screen title
     * @param {string}  campaignUrl  - (Optional) Campaign url for measuring referrals
     * 
     * @static
     * @returns {Promise<void>}
     */
    public static trackView(title: string, campaignUrl?: string): Promise<void> {
        return GoogleAnalytics.trackView(title, campaignUrl)
            .then(console.log, console.error);
    }

    /**
     * Track an event
     * @param {string}  category
     * @param {string}  action
     * @param {string}  label
     * @param {number}  value
     * 
     * @static
     * @returns {Promise<void>}
     */
    public static trackEvent(category: string, action: string, label?: string, value?: number): Promise<void> {
        return GoogleAnalytics.trackEvent(category, action, label, value)
            .then(console.log, console.error);
    }

    /**
     * Set a UserId
     * @param {string}  id
     * 
     * @static
     * @returns {void}
     */
    public static setUserId(id: string): void {
        GoogleAnalytics.setUserId(id);
    }
}