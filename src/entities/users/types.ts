export type FullUser = {
	username: string
	password: string
	email: string
	id: number
}

export type ClientUser = Omit<FullUser, 'password'>

export type CreateUserData = Omit<FullUser, 'id'>
