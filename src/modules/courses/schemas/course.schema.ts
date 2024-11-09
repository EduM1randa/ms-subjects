import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { EducationalLevel } from "src/common/enum/educational-level.enum";

@Schema()
export class Course {
    _id?: Types.ObjectId;

    @Prop({ required: true })
    name?: string;

    @Prop({ required: true })
    educationalLevel?: EducationalLevel;

    @Prop({ required: true })
    year?: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);