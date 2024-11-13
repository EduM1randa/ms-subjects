import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { InscriptionStatus } from "../../../common/enum/inscription-status.enum";
import { addUpdatedAtMiddleware } from "src/common/guards/inscription.middleguard";
import { InscriptionType } from "src/common/enum/inscription-type.enum";

@Schema()
export class Inscription {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true })
    studentId?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Course', required: false })
    courseId?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: false })
    electiveId?: Types.ObjectId;

    @Prop({ required: true })
    createAt?: Date;

    @Prop({ default: Date.now })
    updatedAt?: Date;

    @Prop({ required: true })
    status?: InscriptionStatus;

    @Prop({ required: true })
    type?: InscriptionType;

}
export const InscriptionSchema = SchemaFactory.createForClass(Inscription);

addUpdatedAtMiddleware(InscriptionSchema);