import {
    IsString,
    IsNotEmpty, 
    IsEnum,
    IsNumber
} from 'class-validator';
import { EducationalLevel } from '../enum/educational-level.enum';

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @IsEnum(EducationalLevel)
    educationalLevel!: EducationalLevel; 

    @IsNotEmpty()
    @IsString()
    schedule!: string;

    @IsNumber()
    @IsNotEmpty()
    teacher!: number;

    @IsString()
    @IsNotEmpty()
    course!: string;
}
