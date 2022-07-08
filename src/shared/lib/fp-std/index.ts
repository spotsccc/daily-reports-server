import { either } from 'fp-ts'

export const tryCatchAsync = async <Res, CustomError>(
	f: () => Promise<Res>,
	onError: (e: Error) => CustomError,
): Promise<either.Either<CustomError, Res>> => {
	let res: either.Either<CustomError, Res>
	try {
		res = either.right(await f())
	} catch (e) {
		res = either.left(onError(e))
	}
	return res
}
