import {
  AfterViewInit,
  Component,
  OnDestroy,
  effect,
  inject
} from '@angular/core';

import * as Cesium from 'cesium';

import { SimulationService } from '../../../services/simulation.service';
import { EntityService } from '../../../services/entity.service';

import { Aircraft } from '../../../core/models/Aircraft';
import { Radar } from '../../../core/models/Radar';
import { Entity } from '../../../core/models/Entity';
import { Position } from '../../../core/models/Position';

import { EditorTool } from '../../../core/enums/EditorTool';
import { EntityType } from '../../../core/enums/EntityType';

import { IdGenerator } from '../../../core/utils/id-generator';

@Component({
  selector: 'app-cesium-map',
  standalone: true,
  templateUrl: './cesium-map.html',
  styleUrl: './cesium-map.css'
})


export class CesiumMapComponent
implements AfterViewInit, OnDestroy {

  private viewer!: Cesium.Viewer;

  private entityService = inject(EntityService);

  private simulationService = inject(SimulationService);

  constructor() {

    effect(() => {

      this.entityService.entities();
      console.log("Redrawing Cesium");

      if (!this.viewer) return;

      this.viewer.entities.removeAll();

      this.drawEntities();

    });

  }   // <-- constructor ends here

  ngAfterViewInit(): void {

    this.viewer = new Cesium.Viewer('cesiumContainer', {

      animation: false,
      timeline: false,
      homeButton: true,
      sceneModePicker: true,
      baseLayerPicker: true,
      navigationHelpButton: false,
      geocoder: false

    });

    this.viewer.camera.flyTo({

      destination: Cesium.Cartesian3.fromDegrees(
        78.9629,
        20.5937,
        3000000
      )

    });

    this.initializeClickHandler();

    this.initializeSelectionHandler();

    this.drawEntities();

  }

  private initializeClickHandler(): void {

  const handler = new Cesium.ScreenSpaceEventHandler(
    this.viewer.scene.canvas
  );

  handler.setInputAction((click: any) => {
    console.log("Cesium clicked");
    console.log(this.simulationService.currentTool());
    console.log(this.simulationService.selectedTemplate());

    
    // If an existing entity was clicked, don't place a new one
    const picked = this.viewer.scene.pick(click.position);

    if (Cesium.defined(picked)) {
      return;
    }

    const ray = this.viewer.camera.getPickRay(click.position);

console.log("Ray:", ray);

if (!ray) return;

const cartesian = this.viewer.scene.globe.pick(
  ray,
  this.viewer.scene
);

console.log("Cartesian:", cartesian);

if (!cartesian) return;

    const cartographic =
      Cesium.Cartographic.fromCartesian(cartesian);

    const latitude =
      Cesium.Math.toDegrees(cartographic.latitude);

    const longitude =
      Cesium.Math.toDegrees(cartographic.longitude);

    switch (this.simulationService.currentTool()) {

      case EditorTool.Aircraft:
        this.placeAircraft(latitude, longitude);
        break;

      case EditorTool.Radar:
        this.placeRadar(latitude, longitude);
        break;

    }

  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

}

  private placeAircraft(lat: number, lng: number): void {

  const selected = this.simulationService.selectedTemplate();

  const aircraft = new Aircraft(
    IdGenerator.generate('Aircraft'),
    selected?.name ?? 'Aircraft',
    new Position(
      lat,
      lng,
      selected?.altitude ?? 10000
    ),
    selected?.speed ?? 0,
    selected?.heading ?? 0
  );

  this.entityService.addEntity(aircraft);

  console.log("Aircraft Added");
  console.log(this.entityService.entities());

}

  private placeRadar(lat: number, lng: number): void {

  const selected =
    this.simulationService.selectedTemplate();

  const radar = new Radar(

    IdGenerator.generate('Radar'),

    selected?.name ?? 'Radar',

    new Position(
      lat,
      lng,
      0
    ),

    selected?.range ?? 50000

  );

  this.entityService.addEntity(radar);

}

  private initializeSelectionHandler(): void {

  }

  private drawEntity(entity: Entity): void {

  if (entity.type === EntityType.Aircraft) {

    const aircraft = entity as Aircraft;

    this.viewer.entities.add({

      id: aircraft.id,

      name: aircraft.name,

      position: Cesium.Cartesian3.fromDegrees(
        aircraft.position.longitude,
        aircraft.position.latitude,
        aircraft.position.altitude
      ),

      point: {
        pixelSize: 12,
        color: Cesium.Color.BLUE
      },

      label: {
        text: aircraft.name,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        scale: 0.7
      }

    });

  }

  else if (entity.type === EntityType.Radar) {

    const radar = entity as Radar;

    this.viewer.entities.add({

      id: radar.id,

      name: radar.name,

      position: Cesium.Cartesian3.fromDegrees(
        radar.position.longitude,
        radar.position.latitude,
        0
      ),

      point: {
        pixelSize: 14,
        color: Cesium.Color.RED
      },

      label: {
        text: radar.name,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        scale: 0.7
      }

    });

    this.viewer.entities.add({

      position: Cesium.Cartesian3.fromDegrees(
        radar.position.longitude,
        radar.position.latitude
      ),

      ellipse: {

        semiMajorAxis: radar.range,

        semiMinorAxis: radar.range,

        material: Cesium.Color.RED.withAlpha(0.20),

        outline: true,

        outlineColor: Cesium.Color.RED

      }

    });

  }

}
  private drawEntities(): void {

  const entities = this.entityService.entities();

  for (const entity of entities) {

    this.drawEntity(entity);

  }

}

  ngOnDestroy(): void {

    if (this.viewer) {
      this.viewer.destroy();
    }

  }

}