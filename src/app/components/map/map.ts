import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationService } from '../../services/simulation.service';
import { ViewMode } from '../../core/enums/ViewMode';

import { LeafletMap } from './leaflet-map/leaflet-map';
import { CesiumMapComponent } from './cesium-map/cesium-map';

@Component({
  selector: 'app-map',
  standalone: true,

  imports: [
    CommonModule,
    LeafletMap,
    CesiumMapComponent
  ],

  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class MapComponent {

  ViewMode = ViewMode;

  constructor(public simulationService: SimulationService){}

}