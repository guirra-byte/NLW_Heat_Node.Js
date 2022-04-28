import { Request, response, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { UserRepository } from '../Repository/Implementation/UserRepository'

export class AuthenticateUserController {

  async handle(request: Request, response: Response) {

    const { code } = request.body

    const userRepository = UserRepository.getInstance()
    const authUser = new AuthenticateUserUseCase(userRepository)

    try {

      const result = await authUser.execute(code)
      return response.status(201).json(result)
    }
    catch (exception) {

      return response.status(400).send(exception)
    }

  }
}