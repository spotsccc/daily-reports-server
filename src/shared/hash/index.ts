import { Module } from '@nestjs/common'

import { HashService } from './service'

export { HashService } from './service'

@Module({
	providers: [HashService],
	exports: [HashService],
})
export class HashModule {}
