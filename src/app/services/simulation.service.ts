import { Injectable, signal } from '@angular/core';

import { EditorTool } from '../core/enums/EditorTool';
import { ViewMode } from '../core/enums/ViewMode';
import { Entity } from '../core/models/Entity';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  currentTool = signal(EditorTool.Select);

  currentView = signal(ViewMode.Leaflet);

  selectedEntity = signal<Entity | null>(null);

  setTool(tool: EditorTool) {
    this.currentTool.set(tool);
  }

  setView(view: ViewMode) {
    this.currentView.set(view);
  }

  selectEntity(entity: Entity | null) {
    this.selectedEntity.set(entity);
  }

}