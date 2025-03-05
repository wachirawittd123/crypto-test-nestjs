import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingService {
    static PORT = process.env.PORT || 3000;
    static REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
    static COINGECKO_URL = process.env.COINGECKO_URL || "https://api.coingecko.com/api/v3/simple/price";
    static JWT_SECRET: string = process.env.JWT_SECRET || "wachi07"
}