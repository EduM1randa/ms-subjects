import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Schedule {
    _id?:Types.ObjectId;

    @Prop({ required: true })
    day?: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Block' })
    blockId?: Types.ObjectId;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);