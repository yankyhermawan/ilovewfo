import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseInterface } from '../utility/response'

interface payload {
	id: number
	username: string,
	iat: number,
	exp: number
}

export const getUserIdFromToken = (req: Request) => {
	try {
		const token = String(req.headers["authorization"]?.split(" ")[1].replace("'", ""))
		const dt = jwt.verify(token, String(process.env['JWT_KEY'])) as payload
		return dt
	} catch (err) {
		return null
	}
}

export const checkTokenValid = (req: Request): ResponseInterface => {
	try {
		const token = String(req.headers["authorization"]?.split(" ")[1].replace("'", ""))
		const dt = jwt.verify(token, String(process.env['JWT_KEY'])) as payload
		const exp = dt.exp
		if (Date.now() < exp) {
			return {
				status: StatusCodes.UNAUTHORIZED,
				errorMessage: 'Token Expired'
			}
		}
		return {
			status: StatusCodes.OK,
			data: { message: 'Access Granted' }
		}
	} catch (err) {
		return {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			errorMessage: 'Internal Service Error'
		}
	}
}

const authentication = (token: string) => {
	try {
		return jwt.verify(token, String(process.env['JWT_KEY'])) as JwtPayload
	} catch (err) {
		return false
	}
}

const authorization = (userID: string, token: string) => {
    try {
        const decodedToken = authentication(token)
        if (typeof decodedToken === 'boolean') {
            return false
        }
        if (decodedToken.id !== userID) {
            return false
        }
        return true
    } catch (err) {
        return false
    }
}

export const authenticationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = String(
			req.headers["authorization"]?.split(" ")[1].replace("'", "")
		)
		const checkToken = authentication(token)
		if (checkToken) {
			next()
		} else {
			res.status(401).json("Invalid token")
		}
	} catch (err) {
		res.status(500).json("Error authenticating")
	}
};

export const authorizationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = String(
			req.headers['authorization']?.split(' ')[1].replace('"', '')
		)
		if (authorization(req.params.id, token)) {
			next()
		} else {
			res.status(401).json("Unauthorized")
		}
	} catch (err) {
		res.status(500).json("Error Authorization")
	}
};