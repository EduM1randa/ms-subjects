import {
  Controller,
  Body,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { MessagePattern } from '@nestjs/microservices';
import { Block } from './schemas/block.schema';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @MessagePattern({ cmd: 'get-blocks' })
  async getBlocks(): Promise<Block[]> {
    return await this.schedulesService.getBlocks();
  }

  @MessagePattern({ cmd: 'get-schedules' })
  async getSchedules(): Promise<any> {
    return await this.schedulesService.getSchedules();
  }
}
