import { bootstrap } from '@diamantaire/gateway/core';
import { Logger } from '@nestjs/common';

bootstrap().then((port) =>
  Logger.log(`🚀 App successfully started on port ${port} !`)
);
