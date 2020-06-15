
import { Module, Global } from '@nestjs/common';
import { UtilityService } from './services/utility.service';

@Global()
@Module({
  providers: [
    UtilityService,
  ],
  exports: [UtilityService],
})
export class SharedModule {}
