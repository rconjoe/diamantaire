import { Controller, Get, Res, VERSION_NEUTRAL } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Controller({
  path: 'health',
  version: VERSION_NEUTRAL,
})
@ApiTags('Health')
export class HealthController {
  constructor(
    @InjectConnection() private readonly databaseConnection: Connection,
    private health: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private http: HttpHealthIndicator,
    private mongooseDb: MongooseHealthIndicator,
  ) {}

  // @Get()
  // @HealthCheck()
  // check() {
  //   return this.health.check([() => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')]);
  // }
  @Get()
  check(@Res() res) {
    return res.status(200).json({ status: 'ok' });
  }

  @Get('/database')
  @HealthCheck()
  healthCheck() {
    return this.health.check([() => this.mongooseDb.pingCheck('mongodb', { connection: this.databaseConnection })]);
  }

  @Get('/memory')
  @HealthCheck()
  checkMemoryRss() {
    return this.health.check([() => this.memoryHealthIndicator.checkRSS('memory_rss', 300 * 1024 * 1024)]);
  }
}
