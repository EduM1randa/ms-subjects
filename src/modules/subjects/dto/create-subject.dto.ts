import {
    IsString,
    IsNotEmpty, 
    IsBoolean,
    IsMongoId,
    IsArray,
    ArrayNotEmpty
} from 'class-validator';

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true})
    schedule?: string[];

    @IsMongoId()
    @IsNotEmpty()
    teacherId?: string;

    @IsMongoId()
    @IsNotEmpty()
    courseId?: string;

    @IsBoolean()
    @IsNotEmpty()
    isElective?: boolean;
}
