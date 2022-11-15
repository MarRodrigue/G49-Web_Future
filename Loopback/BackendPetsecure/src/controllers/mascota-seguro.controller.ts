import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  Seguro,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaSeguroController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/seguro', {
    responses: {
      '200': {
        description: 'Mascota has one Seguro',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Seguro),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Seguro>,
  ): Promise<Seguro> {
    return this.mascotaRepository.seguro(id).get(filter);
  }

  @post('/mascotas/{id}/seguro', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seguro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {
            title: 'NewSeguroInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) seguro: Omit<Seguro, 'id'>,
  ): Promise<Seguro> {
    return this.mascotaRepository.seguro(id).create(seguro);
  }

  @patch('/mascotas/{id}/seguro', {
    responses: {
      '200': {
        description: 'Mascota.Seguro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {partial: true}),
        },
      },
    })
    seguro: Partial<Seguro>,
    @param.query.object('where', getWhereSchemaFor(Seguro)) where?: Where<Seguro>,
  ): Promise<Count> {
    return this.mascotaRepository.seguro(id).patch(seguro, where);
  }

  @del('/mascotas/{id}/seguro', {
    responses: {
      '200': {
        description: 'Mascota.Seguro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Seguro)) where?: Where<Seguro>,
  ): Promise<Count> {
    return this.mascotaRepository.seguro(id).delete(where);
  }
}
