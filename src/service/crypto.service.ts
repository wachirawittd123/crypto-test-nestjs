import { Injectable, Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedisService } from '../common/connect-redis';
import { firstValueFrom } from 'rxjs';
import { CustomError } from 'src/common/config';

@Injectable()
export class CryptoService {
  private readonly COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(private readonly httpService: HttpService, private readonly redisService: RedisService) {}

  async getCryptoPrice(symbol: string): Promise<any> {
    const cacheKey = `crypto:${symbol}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
        throw new CustomError('cached data', JSON.parse(cachedData).statusCode);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.COINGECKO_URL, {
          params: { ids: symbol, vs_currencies: 'usd' },
        })
      );
      await this.redisService.set(cacheKey, JSON.stringify(response.data), 30); // Cache for 30 sec
      return response.data;
    } catch (error) {
      throw new CustomError('Failed to fetch data from CoinGecko', 500);
    }
  }
}