import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayLoad {

  sub: string
}

export async function ensureAuth(request: Request, response: Response, next: NextFunction) {


  const authToken = request.headers.authorization;

  if (!authToken) {

    return response.status(401).json({

      errorCode: "token.invalid"
    })
  }

  const [, token] = authToken.split(" ");

  try {

    const { sub } = verify(token, "6fe0ec25a152d07f4b472934ac875d75") as IPayLoad;
    request.user_id = sub;

    return next();

  }
  catch (exception) {

    return response.status(401).json({ errorCode: "token.expired" })
  }


}
