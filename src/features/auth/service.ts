import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import { either } from 'fp-ts'

import { Tokens, TokensService } from 'src/entities/tokens'
import { UserService } from 'src/entities/users'
import { HashService } from 'src/shared/hash'

import { SignInUserData, SignUpUserData } from './types'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokensService: TokensService,
		private readonly hashService: HashService,
	) {}

	async signIn({
		password,
		usernameOrEmail,
	}: SignInUserData): Promise<
		either.Either<InternalServerErrorException | ForbiddenException, Tokens>
	> {
		let userE = await this.userService.findUserByUsername(usernameOrEmail)
		if (either.isLeft(userE)) {
			userE = await this.userService.findUserByEmail(usernameOrEmail)
		}
		if (either.isLeft(userE)) {
			return userE
		}
		const { password: hashedPassword, id } = userE.right
		const isPasswordCorrect = await this.hashService.compare(
			password,
			hashedPassword,
		)
		if (!isPasswordCorrect) {
			return either.left(
				new ForbiddenException('Password is not correct'),
			)
		}
		return this.tokensService.createTokens(id)
	}

	async signUp(
		signUpData: SignUpUserData,
	): Promise<either.Either<InternalServerErrorException, Tokens>> {
		const newUserE = await this.userService.createUser(signUpData)
		if (either.isLeft(newUserE)) {
			return newUserE
		}
		return this.tokensService.createTokens(newUserE.right.id)
	}
}
