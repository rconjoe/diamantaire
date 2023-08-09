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
  PipelineStage,
  AggregateOptions,
} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { AbstractDocument } from './abstract.schema';
import { RemovedModel, UpdatedModel } from './types';
mongoosePaginate.paginate.options = {};

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

  async bulkUpdateDiamonds(data: Partial<TDocument>[], slug: string): Promise<any> {
    const bulk = this.model.collection.initializeUnorderedBulkOp();

    data.forEach((item: any) => {
      if (item.isForSale) {
        item.availableForSale = true;
      } else {
        item.availableForSale = false;
      }
      item.slug = slug;
      item.hidden = false;
      bulk.find({ dangerousInternalProductId: item.dangerousInternalProductId }).upsert().updateOne({ $set: item });
    });

    return bulk.execute();
  }

  async aggregate(pipeline?: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options);
  }

  async countDocs(options): Promise<any> {
    return this.model.countDocuments(options);
  }

  find(filterQuery: FilterQuery<TDocument>): any {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async distinct(field: string, filterQuery?: FilterQuery<TDocument>) {
    return this.model.distinct(field, filterQuery);
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
