import { Logger } from '@nestjs/common';
import {
  FilterQuery,
  UpdateQuery,
  SaveOptions,
  Connection,
  UpdateWithAggregationPipeline,
  QueryOptions,
  PaginateModel,
  Types,
} from 'mongoose';

import { AbstractDocument } from './abstract.schema';
import { RemovedModel, UpdatedModel } from './types';

// import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: PaginateModel<TDocument>, private readonly connection: Connection) {}

  async create(document: object, options?: SaveOptions): Promise<TDocument> {
    const createdDocument: any = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>, options?: QueryOptions): Promise<TDocument> {
    return await this.model.findOne(filterQuery, undefined, options).lean();

    // if (!document) {
    //   this.logger.warn('Document not found with filterQuery', filterQuery);
    //   throw new NotFoundException('Document not found.');
    // }
  }

  async findById<T>(id: string | number, options?: any): Promise<T> {
    this.logger.verbose(`Find one user by id ${id}`);

    return this.model.findById<T>(id, options).lean();
  }

  async updateOne<T>(
    filter: FilterQuery<T>,
    updated: any,
    options?: UpdateQuery<T> | UpdateWithAggregationPipeline,
  ): Promise<UpdatedModel> {
    return this.model.updateOne(filter, updated, options);
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    // if (!document) {
    //   this.logger.warn(`Document not found with filterQuery:`, filterQuery);
    //   throw new NotFoundException('Document not found.');
    // }

    return document;
  }

  async upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<any> {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async paginate(filterQuery: FilterQuery<TDocument>, options?: QueryOptions): Promise<any> {
    return this.model.paginate(filterQuery, options);
  }

  async remove<T>(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.remove(filter);

    return { deletedCount, deleted: !!deletedCount };
  }

  async startTransaction(): Promise<any> {
    const session = await this.connection.startSession();

    session.startTransaction();

    return session;
  }
}
