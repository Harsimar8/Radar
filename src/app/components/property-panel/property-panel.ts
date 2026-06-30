import { Component } from '@angular/core';
import { SimulationService } from '../../services/simulation.service';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-property-panel',
  standalone: true,
  imports: [],
  templateUrl: './property-panel.html',
  styleUrl: './property-panel.css',
})


export class PropertyPanel {

  constructor(
    public simulationService: SimulationService,
    private entityService: EntityService
  ) {}

  removeSelected() {

    const entity = this.simulationService.selectedEntity();

    if (!entity) {
      return;
    }

    this.entityService.removeEntity(entity.id);

    this.simulationService.selectEntity(null);

  }

}