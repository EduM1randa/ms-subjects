import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class Evaluation {
    _id!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
    student?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
    subject?: Types.ObjectId;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    totalScore!: number;

    @Prop({ required: true })
    obtainedScore!: number;

    @Prop({ required: true })
    grade!: number;

    @Prop({ required: true })
    date!: Date;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);