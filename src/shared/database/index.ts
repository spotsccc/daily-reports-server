import { Module } from '@nestjs/common'

import { DatabaseService } from './service'

export { DatabaseService } from './service'

@Module({
	providers: [DatabaseService],
	exports: [DatabaseService],
})
export class DatabaseModule {}
