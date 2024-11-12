import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsWeekday(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isWeekday',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const weekdays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
          return typeof value === 'string' && weekdays.includes(value.toLowerCase());
        },
        defaultMessage(args: ValidationArguments) {
          return 'El día debe ser uno de los siguientes: lunes, martes, miércoles, jueves, viernes';
        },
      },
    });
  };
}