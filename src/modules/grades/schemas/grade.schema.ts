import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Grade {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Evaluation', required: true })
    evaluationId?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true })
    studentId?: Types.ObjectId;

    @Prop({ required: true })
    score?: number;

    @Prop({ required: true })
    grade?: number;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);