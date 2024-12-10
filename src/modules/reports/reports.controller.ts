import { Controller } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @MessagePattern({ cmd: 'get-report' })
  async getReporte(@Payload() data: {
    studentId: string,
    year: number,
  }): Promise<string> {
    const report = await this.reportsService.getReport(
      data.studentId,
      data.year,
    );

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      report.on('data', (chunk) => chunks.push(chunk));
      report.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
      report.on('error', (err) => reject(err));
      report.end();
    });
  }
}


