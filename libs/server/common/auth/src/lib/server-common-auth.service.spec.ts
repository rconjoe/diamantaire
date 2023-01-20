import { Test } from '@nestjs/testing';
import { ServerCommonAuthService } from './server-common-auth.service';

describe('ServerCommonAuthService', () => {
  let service: ServerCommonAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerCommonAuthService],
    }).compile();

    service = module.get(ServerCommonAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
