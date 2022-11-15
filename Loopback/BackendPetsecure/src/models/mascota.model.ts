import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Seguro} from './seguro.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  chip: number;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  id_suscripcion: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasOne(() => Seguro)
  seguro: Seguro;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
