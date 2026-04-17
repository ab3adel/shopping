import { Controller, Get } from '@nestjs/common';
import { GaymentServiceService } from './gayment-service.service';

@Controller()
export class GaymentServiceController {
  constructor(private readonly gaymentServiceService: GaymentServiceService) {}

  @Get()
  getHello(): string {
    return this.gaymentServiceService.getHello();
  }
}
