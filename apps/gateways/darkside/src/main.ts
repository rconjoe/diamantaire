import { bootstrap } from '@diamantaire/gateways/darkside/core';
import { Logger } from '@nestjs/common';

bootstrap().then((port) =>
  Logger.log(`🚀 App successfully started on port ${port} !`)
);
