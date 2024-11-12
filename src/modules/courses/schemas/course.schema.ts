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

    @Prop({ required: true })
    letter?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);