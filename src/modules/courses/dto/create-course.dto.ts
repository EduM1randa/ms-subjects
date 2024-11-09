import { 
    IsEnum,
    IsNotEmpty, 
    IsNumber, 
} from "class-validator";
import { IsCourseName } from "../../../common/decorators/course-validator.decorator";
import { EducationalLevel } from "src/common/enum/educational-level.enum";

export class CreateCourseDto {
    @IsCourseName({message: 'El nombre del curso debe ser un valor entre 1° y 8°.'})
    @IsNotEmpty()
    name?: string;

    @IsEnum(EducationalLevel)
    @IsNotEmpty()
    educationalLevel?: string;

    @IsNumber()
    @IsNotEmpty()
    year?: number;
}
