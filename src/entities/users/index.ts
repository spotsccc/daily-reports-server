import { Module } from '@nestjs/common'

import { UserService } from './service'
import { HashModule } from 'src/shared/hash'
import { DatabaseModule } from 'src/shared/database'

export { UserService } from './service'

@Module({
	providers: [UserService],
	imports: [HashModule, DatabaseModule],
	exports: [UserService],
})
export class UsersModule {}
