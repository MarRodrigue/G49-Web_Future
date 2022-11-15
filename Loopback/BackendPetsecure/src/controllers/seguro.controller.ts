import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Seguro} from '../models';
import {SeguroRepository} from '../repositories';

export class SeguroController {
  constructor(
    @repository(SeguroRepository)
    public seguroRepository : SeguroRepository,
  ) {}

  @post('/seguros')
  @response(200, {
    description: 'Seguro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Seguro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {
            title: 'NewSeguro',
            exclude: ['id'],
          }),
        },
      },
    })
    seguro: Omit<Seguro, 'id'>,
  ): Promise<Seguro> {
    return this.seguroRepository.create(seguro);
  }

  @get('/seguros/count')
  @response(200, {
    description: 'Seguro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Seguro) where?: Where<Seguro>,
  ): Promise<Count> {
    return this.seguroRepository.count(where);
  }

  @get('/seguros')
  @response(200, {
    description: 'Array of Seguro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Seguro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Seguro) filter?: Filter<Seguro>,
  ): Promise<Seguro[]> {
    return this.seguroRepository.find(filter);
  }

  @patch('/seguros')
  @response(200, {
    description: 'Seguro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {partial: true}),
        },
      },
    })
    seguro: Seguro,
    @param.where(Seguro) where?: Where<Seguro>,
  ): Promise<Count> {
    return this.seguroRepository.updateAll(seguro, where);
  }

  @get('/seguros/{id}')
  @response(200, {
    description: 'Seguro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Seguro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Seguro, {exclude: 'where'}) filter?: FilterExcludingWhere<Seguro>
  ): Promise<Seguro> {
    return this.seguroRepository.findById(id, filter);
  }

  @patch('/seguros/{id}')
  @response(204, {
    description: 'Seguro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seguro, {partial: true}),
        },
      },
    })
    seguro: Seguro,
  ): Promise<void> {
    await this.seguroRepository.updateById(id, seguro);
  }

  @put('/seguros/{id}')
  @response(204, {
    description: 'Seguro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() seguro: Seguro,
  ): Promise<void> {
    await this.seguroRepository.replaceById(id, seguro);
  }

  @del('/seguros/{id}')
  @response(204, {
    description: 'Seguro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.seguroRepository.deleteById(id);
  }
}
