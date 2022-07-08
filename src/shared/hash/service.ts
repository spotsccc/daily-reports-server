import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

@Injectable()
export class HashService {
	private readonly saltOrRounds = 10

	hash(password: string): Promise<string> {
		return hash(password, this.saltOrRounds)
	}

	compare(password: string, hash: string): Promise<boolean> {
		return compare(password, hash)
	}
}
