import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './schemas/block.schema';
import { Model } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
    @InjectModel(Block.name) private readonly blockModel: Model<Block>,
  ) {}

  async getBlocks(): Promise<Block[]> {
    try {
      const blocks = await this.blockModel.find();
      if (blocks.length === 0) {
        throw new NotFoundException('No se encontraron bloques.');
      }
      return blocks;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener bloques.');
    }
  }

  async getSchedules(): Promise<Schedule[]> {
    try {
      const schedules = await this.scheduleModel.find();
      if (schedules.length === 0) {
        throw new NotFoundException('No se encontraron horarios.');
      }
      return schedules;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener horarios.');
    }
  }

  async findBlocks(ids: string[]): Promise<boolean> {
    const blocks = await this.blockModel.find({ _id: { $in: ids } });
    return blocks.length === ids.length;
  }

  async findSchedules(ids: string[]): Promise<boolean> {
    const schedules = await this.scheduleModel.find({ _id: { $in: ids } });
    return schedules.length === ids.length;
  }

  async findScheduleById(id: string): Promise<Schedule> {
    try {
      const schedule = await this.scheduleModel.findById(id);
      if (!schedule) {
        throw new NotFoundException('Horario no encontrado.');
      }
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener horario.');
    }
  }
}
