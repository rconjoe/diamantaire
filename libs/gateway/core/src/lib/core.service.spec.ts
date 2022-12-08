import { Test } from '@nestjs/testing';
import { ApiGatewayCoreService } from './api-gateway-core.service';

describe('ApiGatewayCoreService', () => {
  let service: ApiGatewayCoreService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGatewayCoreService],
    }).compile();

    service = module.get(ApiGatewayCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
