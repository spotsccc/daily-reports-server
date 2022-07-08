import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { either } from 'fp-ts'

import { DatabaseService } from 'src/shared/database/service'
import { HashService } from 'src/shared/hash/service'
import { tryCatchAsync } from 'src/shared/lib/fp-std'

import { CreateUserData, FullUser } from './types'

@Injectable()
export class UserService {
	constructor(
		private readonly hashService: HashService,
		private readonly databaseService: DatabaseService,
	) {}

	async createUser({
		password,
		username,
		email,
	}: CreateUserData): Promise<
		either.Either<InternalServerErrorException, FullUser>
	> {
		const hashPassword = await this.hashService.hash(password)
		const createUserResE = await tryCatchAsync(
			() => this.databaseService.client<FullUser[]>`
			insert into users (email, password, username) values (${email}, ${hashPassword}, ${username})
		`,
			(e) => new InternalServerErrorException(e),
		)
		if (either.isLeft(createUserResE)) {
			return createUserResE
		}
		return this.findUserByEmail(email)
	}

	findUserByUsername(
		username: string,
	): Promise<either.Either<InternalServerErrorException, FullUser>> {
		return tryCatchAsync(
			() => this.databaseService.client<FullUser[]>`
				select * from users where username = ${username};
			`,
			(e) => new InternalServerErrorException(e),
		).then(either.map((users) => users[0]))
	}

	findUserByEmail(
		email: string,
	): Promise<either.Either<InternalServerErrorException, FullUser>> {
		return tryCatchAsync(
			() => this.databaseService.client<FullUser[]>`
				select * from users where email = ${email};
			`,
			(e) => new InternalServerErrorException(e),
		).then(either.map((users) => users[0]))
	}
}
