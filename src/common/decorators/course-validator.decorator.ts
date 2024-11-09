import { 
    registerDecorator, 
    ValidationArguments, 
    ValidationOptions 
} from "class-validator";

export function IsCourseName(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "isCourseName",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, validationArguments: ValidationArguments) {
                    if(typeof value !== 'string') return false;
                    const COURSE_NAME_REGEX = /^(1°|2°|3°|4°|5°|6°|7°|8°)$/;
                    return COURSE_NAME_REGEX.test(value);
                }, 
                defaultMessage(validationArguments: ValidationArguments) {
                    return 'Nombre del curso inválido. Debe ser un valor entre 1° y 8°.';
                },
            },
        });
    };
}