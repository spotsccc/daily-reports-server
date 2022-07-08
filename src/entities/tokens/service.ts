import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v4 } from 'uuid'
import { addDays, addHours } from 'date-fns'
import { either } from 'fp-ts'

import { DatabaseService } from 'src/shared/database'
import { tryCatchAsync } from 'src/shared/lib/fp-std'

import { Token, Tokens } from './types'

@Injectable()
export class TokensService {
	// duration in hours
	private readonly accessTokenLifeDuration = 10
	// duration in days
	private readonly refreshTokenLifeDuration = 14

	constructor(private readonly databaseService: DatabaseService) {}

	public async createTokens(
		userId: number,
	): Promise<either.Either<InternalServerErrorException, Tokens>> {
		const refreshTokenE = await this.insertRefreshToken(
			this.generateRefreshToken(userId),
		)
		if (either.isLeft(refreshTokenE)) {
			return refreshTokenE
		}
		const accessTokenE = await this.insertAccessToken(
			this.generateAccessToken(userId),
		)
		if (either.isLeft(accessTokenE)) {
			return accessTokenE
		}
		return either.right({
			refreshToken: refreshTokenE.right,
			accessToken: accessTokenE.right,
		})
	}

	public validateTokens() {}

	private generateAccessToken(userId: number): Token {
		return {
			tokenString: v4(),
			userId,
			expiresAt: addHours(new Date(), this.accessTokenLifeDuration),
		}
	}

	private generateRefreshToken(userId: number): Token {
		return {
			tokenString: v4(),
			userId,
			expiresAt: addDays(new Date(), this.refreshTokenLifeDuration),
		}
	}

	private async insertAccessToken({
		userId,
		tokenString,
		expiresAt,
	}: Token): Promise<either.Either<InternalServerErrorException, Token>> {
		const tokenInsertE = await tryCatchAsync(
			() => this.databaseService.client`
			insert into access_tokens (user_id, token_string, expires_at)
		 values (${userId}, ${tokenString}, ${expiresAt});
		`,
			(e) => new InternalServerErrorException(e),
		)
		if (either.isLeft(tokenInsertE)) {
			return tokenInsertE
		}
		return either.right({ userId, tokenString, expiresAt })
	}

	private async insertRefreshToken({
		userId,
		tokenString,
		expiresAt,
	}: Token): Promise<either.Either<InternalServerErrorException, Token>> {
		const tokenInsertE = await tryCatchAsync(
			() => this.databaseService.client`
			insert into refresh_tokens (user_id, token_string, expires_at)
		 values (${userId}, ${tokenString}, ${expiresAt});
		`,
			(e) => new InternalServerErrorException(e),
		)
		if (either.isLeft(tokenInsertE)) {
			return tokenInsertE
		}
		return either.right({ userId, tokenString, expiresAt })
	}

	private findAccessToken() {}

	private findRefreshToken() {}

	private deleteAccessToken() {}

	private deleteRefreshToken() {}
}
