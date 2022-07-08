export type Token = {
	userId: number
	tokenString: string
	expiresAt: Date
}

export type Tokens = {
	accessToken: Token
	refreshToken: Token
}
