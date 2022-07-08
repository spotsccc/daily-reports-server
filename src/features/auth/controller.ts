import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { either } from 'fp-ts'

import { SignInUserData, SignUpUserData } from './types'
import { AuthService } from './service'
import { addDays } from 'date-fns'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-in')
	async signIn(
		@Body() signInData: SignInUserData,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokensE = await this.authService.signIn(signInData)
		if (either.isLeft(tokensE)) {
			throw tokensE.left
		}
		res.cookie('accessToken', tokensE.right.accessToken, {
			httpOnly: true,
			expires: addDays(new Date(), 14),
			path: '/',
		})
		res.cookie('refreshToken', tokensE.right.refreshToken, {
			httpOnly: true,
			expires: addDays(new Date(), 14),
			path: '/',
		})
		return {
			accessToken: tokensE.right.accessToken,
			refreshToken: tokensE.right.refreshToken,
		}
	}

	@Post('sign-up')
	async signUp(
		@Body() signUpData: SignUpUserData,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokensE = await this.authService.signUp(signUpData)
		if (either.isLeft(tokensE)) {
			console.log(tokensE.left)
			throw tokensE.left
		}
		res.cookie('accessToken', tokensE.right.accessToken, {
			httpOnly: true,
			expires: addDays(new Date(), 14),
			path: '/',
		})
		res.cookie('refreshToken', tokensE.right.refreshToken, {
			httpOnly: true,
			expires: addDays(new Date(), 14),
			path: '/',
		})
		return {
			accessToken: tokensE.right.accessToken,
			refreshToken: tokensE.right.refreshToken,
		}
	}
}
