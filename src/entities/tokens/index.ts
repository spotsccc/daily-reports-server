import { Module } from '@nestjs/common'

import { DatabaseModule } from 'src/shared/database'

import { TokensService } from './service'

@Module({
	imports: [DatabaseModule],
	providers: [TokensService],
	exports: [TokensService],
})
export class TokensModule {}

export type { Token, Tokens } from './types'
export { TokensService } from './service'
