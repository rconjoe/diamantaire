import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  // we can validate for multiple api keys
  private apiKeys: string[] = [this.configService.get<string>('API_KEY')];
  validateApiKey(apiKey: string) {
    return this.apiKeys.find((apiK) => apiKey === apiK);
  }
}
