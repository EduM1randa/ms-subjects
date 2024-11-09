import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { InscriptionStatus } from "src/common/enum/inscription-status.enum";

export class UpdateInscriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  courseId?: string;

  @IsEnum(InscriptionStatus)
  @IsNotEmpty()
  status?: InscriptionStatus;
}
