import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Average {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
  subjectId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  studentId?: Types.ObjectId;

  @Prop({ required: true })
  average?: number;
}

export const AverageSchema = SchemaFactory.createForClass(Average);