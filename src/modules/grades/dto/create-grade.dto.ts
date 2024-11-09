import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class CreateGradeDto {
    @IsNotEmpty()
    @IsMongoId()
    evaluationId?: string;

    @IsNotEmpty()
    @IsMongoId()
    studentId?: string;

    @IsNumber()
    @IsNotEmpty()
    score?: number;

    @IsNumber()
    @IsNotEmpty()
    grade?: number;
}
