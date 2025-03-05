import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from '../service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('price')
  async getPrice(@Query('symbol') symbol: string) {
    try{
      if (!symbol) {
        return { status: 400, message: 'Symbol query parameter is required' };
      }
      const result = await this.cryptoService.getCryptoPrice(symbol.toLowerCase());
      return { status: 200, data: result, message: 'Success' };
    } catch (error) {
      return { status: error.statusCode, message: error.message };
    }
  }
}