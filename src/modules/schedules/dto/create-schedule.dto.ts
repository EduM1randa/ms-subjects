import { IsNotEmpty, IsMongoId } from 'class-validator';
import { IsWeekday } from 'src/common/decorators/day-validator.decorator';

export class CreateScheduleDto {
  @IsWeekday({ message: 'El día debe ser uno de los siguientes: lunes, martes, miércoles, jueves, viernes' })
  @IsNotEmpty()
  day?: string;

  @IsMongoId()
  @IsNotEmpty()
  blockId?: string;
}
