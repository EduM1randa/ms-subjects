import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { EducationalLevel } from "../enum/educational-level.enum";
import { Types } from "mongoose";

@Schema()
export class Subject {
    _id?: Types.ObjectId;

    @Prop({ required: true })
    name?: string;

    @Prop({ required: true })
    educationalLevel?: EducationalLevel; 

    @Prop({ required: true })
    schedule?: string;

    @Prop({ required: true })
    teacher?: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Course' })
    course?: Types.ObjectId;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);