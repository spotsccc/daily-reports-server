import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class SignUpUserData {
	@IsNotEmpty()
	@IsString()
	@Length(4, 100)
	username: string

	@IsNotEmpty()
	@IsEmail()
	@Length(4, 100)
	email: string

	@IsNotEmpty()
	@IsString()
	@Length(8, 100)
	password: string
}

export class SignInUserData {
	@IsNotEmpty()
	@IsString()
	@Length(4, 100)
	usernameOrEmail: string

	@IsNotEmpty()
	@IsString()
	@Length(8, 100)
	password: string
}
