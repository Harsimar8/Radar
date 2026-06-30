import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapSyncService {

  readonly center = signal({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 5
  });

  update(
    latitude: number,
    longitude: number,
    zoom: number
  ) {
    this.center.set({
      latitude,
      longitude,
      zoom
    });
  }

}