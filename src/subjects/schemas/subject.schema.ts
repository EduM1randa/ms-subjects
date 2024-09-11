import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum EducationalLevel {
    KINDER = 'primary',
    BASICA = 'secondary',
    MEDIA = 'tertiary'
}

@Schema()
export class Subject {

    @Prop({ required: true })
    name?: string;

    @Prop({ required: true })
    educationalLevel?: EducationalLevel; 

    @Prop({ required: true })
    schedule?: string;

    @Prop({ required: true })
    teacher?: number;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
