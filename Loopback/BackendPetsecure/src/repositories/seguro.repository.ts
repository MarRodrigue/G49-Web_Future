import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Seguro, SeguroRelations} from '../models';

export class SeguroRepository extends DefaultCrudRepository<
  Seguro,
  typeof Seguro.prototype.id,
  SeguroRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Seguro, dataSource);
  }
}
