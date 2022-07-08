import { Module } from '@nestjs/common'

import { AuthModule } from 'src/features/auth'
import { TokensModule } from 'src/entities/tokens'
import { UsersModule } from 'src/entities/users'
import { DatabaseModule } from 'src/shared/database'
import { HashModule } from 'src/shared/hash'

@Module({
	imports: [
		AuthModule,
		TokensModule,
		UsersModule,
		DatabaseModule,
		HashModule,
	],
})
export class AppModule {}
