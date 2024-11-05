import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class Inscription {
    @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
    student?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
    subject?: Types.ObjectId;

    // @Prop({ required: true })
    // year?: number;
}

export const InscriptionSchema = SchemaFactory.createForClass(Inscription);
