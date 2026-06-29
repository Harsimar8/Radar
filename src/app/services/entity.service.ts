import { Injectable, signal, effect } from '@angular/core';
import { Entity } from '../core/models/Entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private STORAGE_KEY = 'air-defense-entities';

  entities = signal<Entity[]>([]);

  constructor() {

    // Load saved entities
    const saved = localStorage.getItem(this.STORAGE_KEY);

    if (saved) {
      this.entities.set(JSON.parse(saved));
    }

    // Save automatically whenever entities change
    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.entities())
      );
    });

  }

  addEntity(entity: Entity) {
    this.entities.update(list => [...list, entity]);
  }

  getEntities() {
    return this.entities();
  }

  clear() {
    this.entities.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

}