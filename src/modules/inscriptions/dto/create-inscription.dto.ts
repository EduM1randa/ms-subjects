import { IsNotEmpty, IsString } from "class-validator";

export class CreateInscriptionDto {
    @IsString()
    @IsNotEmpty()
    student!: string;

    @IsString()
    @IsNotEmpty()
    subject!: string;

    // year!: number;
}
