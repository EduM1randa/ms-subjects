import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Evaluation {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
    subjectId?: Types.ObjectId;

    @Prop({ required: true })
    description?: string;  

    @Prop({ required: true })
    totalScore?: number;

    @Prop({ required: true })
    date?: Date;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);