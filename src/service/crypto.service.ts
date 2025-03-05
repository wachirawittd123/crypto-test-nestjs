import { Injectable, Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedisService } from '../common/connect-redis';
import { firstValueFrom } from 'rxjs';
import { CustomError } from 'src/common/config';
import { SettingService } from 'src/common/setting';

@Injectable()
export class CryptoService {
  private readonly COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(private readonly httpService: HttpService, private readonly redisService: RedisService) {}

  async getCryptoPrice(symbols: string): Promise<any> {
    const cacheKey = `crypto:${symbols}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
        throw new CustomError('cached data', JSON.parse(cachedData).statusCode);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(SettingService.COINGECKO_URL, {
          params: { ids: symbols, vs_currencies: 'usd' },
        })
      );
      await this.redisService.set(cacheKey, JSON.stringify(response.data), 30); // Cache for 30 sec
      return response.data;
    } catch (error) {
      throw new CustomError('Failed to fetch data from CoinGecko', 500);
    }
  }
}