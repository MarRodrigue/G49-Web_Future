import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Persona, Seguro} from '../models';
import {PersonaRepository} from './persona.repository';
import {SeguroRepository} from './seguro.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Mascota.prototype.id>;

  public readonly seguro: HasOneRepositoryFactory<Seguro, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SeguroRepository') protected seguroRepositoryGetter: Getter<SeguroRepository>,
  ) {
    super(Mascota, dataSource);
    this.seguro = this.createHasOneRepositoryFactoryFor('seguro', seguroRepositoryGetter);
    this.registerInclusionResolver('seguro', this.seguro.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
