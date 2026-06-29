import { Component } from '@angular/core';

import { SimulationService } from '../../services/simulation.service';

import { EditorTool } from '../../core/enums/EditorTool';
import { ViewMode } from '../../core/enums/ViewMode';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {

  EditorTool = EditorTool;
  ViewMode = ViewMode;

  constructor(public simulationService: SimulationService) {}

}