import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ObjectId } from 'mongodb';

@ValidatorConstraint({ async: true })
export class IsObjectIdConstraint implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    try {
      return ObjectId.isValid(value);
    } catch {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid MongoDB ObjectID`;
  }
}

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsObjectIdConstraint,
    });
  };
}
