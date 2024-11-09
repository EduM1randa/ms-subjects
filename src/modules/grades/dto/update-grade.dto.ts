import { IsNumber, IsOptional } from "class-validator";

export class UpdateGradeDto {
    @IsNumber()
    @IsOptional()
    score?: number;

    @IsNumber()
    @IsOptional()
    grade?: number;
}
