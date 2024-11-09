import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Subject {
    _id?: Types.ObjectId;

    @Prop({ required: true })
    name?: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Block' }], required: true })
    schedule?: Types.ObjectId[];

    @Prop({ required: true, type: Types.ObjectId })
    teacherId?: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Course' })
    courseId?: Types.ObjectId;    

    @Prop({ required: true })
    isElective?: boolean;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);