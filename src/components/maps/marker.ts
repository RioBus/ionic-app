import { GoogleMap, GoogleMapsMarkerOptions, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsPolylineOptions, GoogleMapsPolyline } from 'ionic-native';
import { ColorUtils } from '../../core/utils';
import { Bus } from '../../models/bus';
import { Itinerary, Spot } from '../../models/itinerary';

/**
 * Bus icon paths
 */
class BusIcon {
    private static BASE: string = 'www/assets/img';
    public static GOOD: string = `${BusIcon.BASE}/bus_green.png`;
    public static AVG: string = `${BusIcon.BASE}/bus_yellow.png`;
    public static BAD: string = `${BusIcon.BASE}/bus_red.png`;
    public static WIDTH: number = 36;
    public static HEIGHT: number = 42;
}

/**
 * MarkerController class is responsible for all main operations
 * related to markers in the map. It adds and removes all the spots
 * in the map.
 * 
 * @class {MarkerController}
 */
export class MarkerController {

    private map: GoogleMap;
    private markers: any = {};
    private locations: GoogleMapsMarker[] = [];
    private trajectory: GoogleMapsPolyline;

    public constructor(map: GoogleMap) {
        this.map = map;
    }

    /**
     * Add/update a bus marker in the map
     * @param {Bus} bus - Bus instance
     * @return {void}
     */
    public setMarker(bus: Bus): void {
        if (this.markers[bus.Order]) this.updatePosition(bus);
        else this.map.addMarker(this.getMarkerData(bus)).then(marker => this.addMarker(bus, marker));
    }

    /**
     * Removes all the markers in the map
     * @return {void}
     */
    public removeMarkers(): void {
        Object.keys(this.markers).forEach((key: string) => this.removeMarker(key));
        this.locations = [];
    }

    /**
     * Create the trajectory Polyline and the start/end markers to place
     * over the map.
     * @param {Itinerary} trajectory - Itinerary instance
     * @return {void}
     */
    public showTrajectory(trajectory: Itinerary): void {
        let positions: GoogleMapsLatLng[] = [];
        let spotFrom: Spot = null, spotTo: Spot = null;
        trajectory.Spots.forEach(spot => {
            if (!spot.isReturning) {
                // Identifying the beginning and the end of the trajectory
                if (!spotFrom) spotFrom = spot;
                else spotTo = spot;
            }
            positions.push(new GoogleMapsLatLng(spot.Latitude, spot.Longitude));
        });

        // Random color to set in the start/end markers and the trajectory
        let color: string = `#${ColorUtils.randomColor((r, g, b) => r <= (g + b) && g <= (r + b))}`;

        if (spotFrom !== null && spotTo !== null) {
            // Marking the start/end of trajectory on the map
            this.map.addMarker(this.getMarkerSpotData(spotFrom, false, color))
            .then(markerFrom => {
                this.markers['from'] = markerFrom;
                return this.map.addMarker(this.getMarkerSpotData(spotTo, true, color));
            }).then(markerTo => this.markers['to'] = markerTo);
        }
        this.map.addPolyline(this.getTrajectoryConfiguration(positions, color))
            .then( (polyline: GoogleMapsPolyline) => this.trajectory = polyline);
    }

    /**
     * Removes the trajectory Polyline from the map.
     * @return {void}
     */
    public hideTrajectory(): void {
        if (this.trajectory) this.trajectory.remove();
    }

    /**
     * @private
     * Updates a Bus marker position in the map
     * @param {Bus} bus - Bus instance
     * @return {void}
     */
    private updatePosition(bus: Bus): void {
        this.markers[bus.Order].setPosition(new GoogleMapsLatLng(bus.Latitude, bus.Longitude));
    }

    /**
     * @private
     * Add a bus marker in the map
     * @param {Bus} bus - Bus instance
     * @return {void}
     */
    private addMarker(bus: Bus, marker: GoogleMapsMarker): void {
        this.markers[bus.Order] = marker;
        this.fitBounds(marker);
        // marker.getPosition().then((latLng: GoogleMapsLatLng) => this.fitBounds(latLng));
    }

    /**
     * @private
     * Removes a marker from the map
     * @param {string} key - Marker key identifier
     * @return {void}
     */
    private removeMarker(key: string): void {
        this.markers[key].remove();
        delete this.markers[key];
    }

    /**
     * @private
     * Gets the configuration of the trajectory polyline
     * @param {GoogleMapsLatLng[]} points - trajectory points in the map
     * @return {GoogleMapsPolylineOptions}
     */
    private getTrajectoryConfiguration(points: GoogleMapsLatLng[], color: string): GoogleMapsPolylineOptions {
        return { points: points, color : color, width: 6, zIndex: 4 };
    }

    /**
     * @private
     * Gets the configuration of the Bus marker
     * @param {Bus} bus - Bus instance
     * @return {GoogleMapsMarkerOptions}
     */
    private getMarkerData(bus: Bus): GoogleMapsMarkerOptions {
        return {
            position: new GoogleMapsLatLng(bus.Latitude, bus.Longitude),
            icon: { url: this.getIconPath(bus.Timestamp), size: { width: BusIcon.WIDTH, height: BusIcon.HEIGHT } },
            title: this.formatInfoWindow(bus),
        };
    }

    /**
     * @private
     * Gets the configuration of the start/end trajectory spot markers
     * @param {Spot} spot - Start/end Spot instance
     * @param {boolean} returning - Is this position part of returning trajectory or not?
     * @return {GoogleMapsMarkerOptions}
     */
    private getMarkerSpotData(spot: Spot, returning: boolean, color: string): GoogleMapsMarkerOptions {
        let obj: any = { position: new GoogleMapsLatLng(spot.Latitude, spot.Longitude) };
        obj.title = (!returning) ? 'PONTO INICIAL' : 'PONTO FINAL';
        obj.icon = color;
        return obj;
    }

    /**
     * @private
     * Fits the current position to the view and recentralize the camera
     * @param {GoogleMapsMarker} location - New marker
     * @return {void}
     */
    private fitBounds(location: GoogleMapsMarker): void {
        this.locations.push(location);
        this.map.animateCamera({ target: this.locations });
    }

    /**
     * @private
     * Returns the correct icon based on last update
     * @param {Date} datetime - Last update time
     * @return {string}
     */
    private getIconPath(datetime: Date): string {
        let minutes: number = ((new Date()).getTime() - datetime.getTime()) / 1000 / 60;
        if (minutes > 10) return BusIcon.BAD;
        else if (minutes >= 5 && minutes < 10) return BusIcon.AVG;
        else return BusIcon.GOOD;
    }

    /**
     * @private
     * Turns the interval into a text message.
     * @param {Date} datetime - Last update time
     * @return {string}
     */
    private prepareTimestamp(datetime: Date): string {
        let timeSinceUpdate: number = (new Date()).getTime() - datetime.getTime();
        timeSinceUpdate = timeSinceUpdate / 1000; // seconds
        if (timeSinceUpdate < 60) {
            return `${timeSinceUpdate.toFixed(0)} segundos`;
        }
        timeSinceUpdate = timeSinceUpdate / 60; // minutes
        if (timeSinceUpdate < 60) {
            return `${timeSinceUpdate.toFixed(0)} minutos`;
        }
        timeSinceUpdate = timeSinceUpdate / 60; // hours
        if (timeSinceUpdate < 24) {
            return `${timeSinceUpdate.toFixed(0)} horas`;
        }
        timeSinceUpdate = timeSinceUpdate / 24; // days
        return `${timeSinceUpdate.toFixed(0)} dias`;
    }

    /**
     * @private
     * Prepares the InfoWindow content
     * @parem {Bus} bus - Bus instance
     * @return {string}
     */
    private formatInfoWindow(bus: Bus): string {
        return `
            ${bus.Order} (${bus.Line})
            Velocidade: ${bus.Speed.toFixed(0)} Km/h
            Direção: ${bus.Direction}
            Atualizado há ${this.prepareTimestamp(bus.Timestamp)}
        `;
    }
}
