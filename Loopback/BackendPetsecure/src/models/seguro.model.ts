import {Entity, model, property} from '@loopback/repository';

@model()
export class Seguro extends Entity {
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
  precio: number;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  constructor(data?: Partial<Seguro>) {
    super(data);
  }
}

export interface SeguroRelations {
  // describe navigational properties here
}

export type SeguroWithRelations = Seguro & SeguroRelations;
