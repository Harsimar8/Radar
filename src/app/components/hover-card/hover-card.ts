import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Entity } from '../../core/models/Entity';
import { Aircraft } from '../../core/models/Aircraft';
import { Radar } from '../../core/models/Radar';
import { EntityType } from '../../core/enums/EntityType';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hover-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hover-card.html',
  styleUrl: './hover-card.css'
})
export class HoverCardComponent {

  @Input() entity!: Entity;

  @Input() x = 0;

  @Input() y = 0;

  @Input() showActions = false;
  @Output() entered = new EventEmitter<void>();

@Output() left = new EventEmitter<void>();

  readonly EntityType = EntityType;

  isAircraft(): boolean {
    return this.entity.type === EntityType.Aircraft;
  }

  isRadar(): boolean {
    return this.entity.type === EntityType.Radar;
  }

  aircraft(): Aircraft {
    return this.entity as Aircraft;
  }

  radar(): Radar {
    return this.entity as Radar;
  }

}