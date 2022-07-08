import { Injectable } from '@nestjs/common'
import * as postgres from 'postgres'
import { either } from 'fp-ts'

@Injectable()
export class DatabaseService {
	client: postgres.Sql<{}>

	constructor() {
		this.client = postgres({
			host: 'ec2-54-228-125-183.eu-west-1.compute.amazonaws.com',
			database: 'd2sur71666lrrj',
			user: 'rtjmwwnwbhdkgi',
			password:
				'2e692fae479848e8ab8eb78c750340b27d7f1611561be69e4266305833acff35',
			ssl: { rejectUnauthorized: false },
		})
	}
}
