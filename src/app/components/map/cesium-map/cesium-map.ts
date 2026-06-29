import {
  AfterViewInit,
  Component
} from '@angular/core';

import * as Cesium from 'cesium';

@Component({
  selector: 'app-cesium-map',
  standalone: true,
  templateUrl: './cesium-map.html',
  styleUrl: './cesium-map.css'
})
export class CesiumMapComponent implements AfterViewInit {

  private viewer!: Cesium.Viewer;

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

  }

}