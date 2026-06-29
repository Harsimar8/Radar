import { Entity } from './Entity';
import { EntityType } from '../enums/EntityType';
import { Position } from './Position';
import { Team } from '../enums/Team';

export class Aircraft extends Entity {

  constructor(

    id: string,

    name: string,

    position: Position,

    public speed: number = 0,

    public heading: number = 0,

    team: Team = Team.Friendly

  ) {

    super(

      id,

      name,

      EntityType.Aircraft,

      position,

      team

    );

  }

}