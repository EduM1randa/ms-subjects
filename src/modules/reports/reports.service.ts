import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { pdfReport } from './documents/build.report';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printer: PrinterService,
  ) {}

  async getReport(): Promise<PDFKit.PDFDocument> {

    const docDefinition: TDocumentDefinitions = pdfReport();
    
    return this.printer.createPdf(docDefinition);
  }

}
