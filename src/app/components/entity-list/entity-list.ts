import { Component } from '@angular/core';

import { SimulationService } from '../../services/simulation.service';

import { EditorTool } from '../../core/enums/EditorTool';

import { AIRCRAFT_LIBRARY } from '../../core/data/aircraft-library';
import { RADAR_LIBRARY } from '../../core/data/radar-library';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [],
  templateUrl: './entity-list.html',
  styleUrl: './entity-list.css',
})
export class EntityList {

  EditorTool = EditorTool;

  aircraftList = AIRCRAFT_LIBRARY;

  radarList = RADAR_LIBRARY;

  constructor(
    public simulationService: SimulationService
  ) {}

  select(item: any) {
    this.simulationService.selectedTemplate.set(item);
  }

}