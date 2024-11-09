import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { InscriptionStatus } from "../../../common/enum/inscription-status.enum";
import { addUpdatedAtMiddleware } from "src/common/guards/inscription.middleguard";

export class Inscription {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true })
    studentId?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
    courseId?: Types.ObjectId;

    @Prop({ required: true })
    createAt?: Date;

    @Prop({ default: Date.now })
    updatedAt?: Date;

    @Prop({ required: true })
    status?: InscriptionStatus;
}
export const InscriptionSchema = SchemaFactory.createForClass(Inscription);

addUpdatedAtMiddleware(InscriptionSchema);