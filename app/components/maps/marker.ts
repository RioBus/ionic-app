'use strict';
declare var plugin: any;

import { Bus } from '../../models/bus';
import { Itinerary } from '../../models/itinerary';

class Icon {
    private static BASE: string = 'www/img';
    public static GOOD: string = `${Icon.BASE}/bus_green.png`;
    public static AVG: string = `${Icon.BASE}/bus_yellow.png`;
    public static BAD: string = `${Icon.BASE}/bus_red.png`;
}

export class MarkerController {

    private map: any;
    private markers: any = {};
    private locations: any[] = [];
    private trajectory: any;

    public constructor(map: any) {
        this.map = map;
    }

    public setMarker(bus: Bus): void {
        if (this.markers[bus.Order]) this.updatePosition(bus);
        else this.map.addMarker(this.getMarkerData(bus), marker => this.addMarker(bus, marker));
    }

    public removeMarkers(): void {
        Object.keys(this.markers).forEach((key) => this.removeMarker(key), this);
        this.locations = [];
    }

    public showTrajectory(trajectory: Itinerary): void {
        let positions: any[] = [];
        trajectory.Spots.forEach(spot => positions.push(new plugin.google.maps.LatLng(spot.Latitude, spot.Longitude)));
        this.map.addPolyline(this.getTrajectoryConfiguration(positions), polyline => this.trajectory = polyline);
    }

    public hideTrajectory(): void {
        if (this.trajectory) this.trajectory.remove();
    }

    private updatePosition(bus: Bus): void {
        this.markers[bus.Order].setPosition(new plugin.google.maps.LatLng(bus.Latitude, bus.Longitude));
    }

    private addMarker(bus: Bus, marker: any): void {
        this.markers[bus.Order] = marker;
        this.fitBounds(marker.get('position'));
    }

    private removeMarker(key: string): void {
        this.markers[key].remove();
        delete this.markers[key];
    }

    private getTrajectoryConfiguration(points: any[]): any {
        return { points: points, color : '#0000FF', width: 5, geodesic: true, zIndex: 4 };
    }

    private getMarkerData(bus: Bus): any {
        return {
            position: new plugin.google.maps.LatLng(bus.Latitude, bus.Longitude),
            title: this.formatInfoWindow(bus),
            icon: {
                url: this.getIconPath(bus.Timestamp),
                size: { width: 40, height: 47 },
            },
        };
    }

    private fitBounds(location: any): void {
        this.locations.push(location);
        let bounds: any = new plugin.google.maps.LatLngBounds(this.locations);
        this.map.animateCamera({ 'target': bounds });
    }

    private getIconPath(datetime: Date): string {
        let minutes: number = ((new Date()).getTime() - datetime.getTime()) / 1000 / 60;
        if (minutes > 10) return Icon.BAD;
        else if (minutes >= 5 && minutes < 10) return Icon.AVG;
        else return Icon.GOOD;
    }

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

    private formatInfoWindow(bus: Bus): string {
        return `
            ${bus.Order} (${bus.Line})
            Velocidade: ${bus.Speed} Km/h
            Direção: ${bus.Direction}
            Atualizado há ${this.prepareTimestamp(bus.Timestamp)}
        `;
    }
}
