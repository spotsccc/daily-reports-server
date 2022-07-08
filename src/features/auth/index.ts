import { Module } from '@nestjs/common'

import { UsersModule } from 'src/entities/users'
import { TokensModule } from 'src/entities/tokens'
import { HashModule } from 'src/shared/hash'

import { AuthController } from './controller'
import { AuthService } from './service'

@Module({
	imports: [UsersModule, TokensModule, HashModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
export type { SignInUserData, SignUpUserData } from './types'
export { AuthService } from './service'
