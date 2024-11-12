import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Block {
    _id?: Types.ObjectId;

    @Prop({ required: true })
    name?: string;

    @Prop({ required: true })
    startTime?: string;

    @Prop({ required: true })
    endTime?: string;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
