/**
 * @file Validation pipe
 * @module pipe/validation
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const isUnverifiableMetaType = (metatype: any): metatype is undefined => {
  const basicTypes = [String, Boolean, Number, Array, Object];
  return !metatype || basicTypes.includes(metatype as any);
};

/**
 * @class ValidationPipe
 * @classdesc validate meta type class format
 */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (isUnverifiableMetaType(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const messages: string[] = [];
      const pushMessage = (constraints = {}) => {
        messages.push(...Object.values<any>(constraints));
      };

      errors.forEach((error) => {
        if (error.constraints) {
          pushMessage(error.constraints);
        }
        // MARK: keep 1 level > Maximum call stack
        if (error.children) {
          error.children.forEach((e) => pushMessage(e.constraints));
        }
      });

      throw new BadRequestException(`Invalid params: ` + messages.join(', '));
    }

    return object;
  }
}
