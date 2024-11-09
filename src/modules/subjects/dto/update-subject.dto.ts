import { 
    IsArray, 
    IsMongoId, 
    IsOptional, 
    IsString 
} from "class-validator";

export class UpdateSubjectDto {
    @IsArray()
    @IsOptional()
    @IsString({ each: true})
    schedule?: string[];

    @IsMongoId()
    @IsOptional()
    teacherId?: string;
}
