import {
  AfterViewInit,
  Component,
  OnDestroy,
  inject
} from '@angular/core';

import * as Cesium from 'cesium';

import { EntityService } from '../../../services/entity.service';
import { EntityType } from '../../../core/enums/EntityType';
import { Aircraft } from '../../../core/models/Aircraft';
import { Radar } from '../../../core/models/Radar';

@Component({
  selector: 'app-cesium-map',
  standalone: true,
  templateUrl: './cesium-map.html',
  styleUrl: './cesium-map.css'
})
export class CesiumMapComponent implements AfterViewInit, OnDestroy {

  private viewer!: Cesium.Viewer;

  private entityService = inject(EntityService);

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

    this.drawEntities();
  }

  private drawEntities(): void {

    const entities = this.entityService.getEntities();

    for (const entity of entities) {

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
            pixelSize: 10,
            color: Cesium.Color.BLUE
          },

          label: {
            text: aircraft.name,
            pixelOffset: new Cesium.Cartesian2(0, -20)
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
            pixelSize: 12,
            color: Cesium.Color.RED
          },

          label: {
            text: radar.name,
            pixelOffset: new Cesium.Cartesian2(0, -20)
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

            material: Cesium.Color.RED.withAlpha(0.25),

            outline: true,

            outlineColor: Cesium.Color.RED

          }

        });

      }

    }

  }

  ngOnDestroy(): void {

    if (this.viewer) {
      this.viewer.destroy();
    }

  }

}