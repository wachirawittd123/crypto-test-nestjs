import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { SettingService } from './setting';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url: SettingService.REDIS_URL });
    this.client.connect().catch((err) => console.log('err connect redis', err));
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.setEx(key, ttl, value);
  }
}
