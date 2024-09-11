import {
    IsString,
    IsNotEmpty, 
    IsEnum,
    IsOptional
} from 'class-validator';
import { EducationalLevel } from '../schemas/subject.schema';

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(EducationalLevel)
    educationalLevel: EducationalLevel; 

    @IsString()
    schedule: string;

    @IsOptional()
    teacher: number;
}
