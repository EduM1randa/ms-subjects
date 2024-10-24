import { 
    IsNotEmpty, 
    IsNumber, 
    IsString 
} from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    year!: number;
}
