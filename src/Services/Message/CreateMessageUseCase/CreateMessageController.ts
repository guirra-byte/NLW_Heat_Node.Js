import { Request, Response } from 'express'
import { MessageRepository } from '../Repository/Implementation/MessageRepository';
import { CreateMessageUseCase } from './CreateMessageUseCase';

export class CreateMessageController {

  async handle(request: Request, response: Response) {

    const { message } = request.body;
    const { user_id } = request;

    const messageRepository = MessageRepository.getInstance()
    const useCase = new CreateMessageUseCase(messageRepository)

    try {

      const createMessage = await useCase.execute(message, user_id)
      return response.status(201).send(createMessage)

    }
    catch (exception) {

      return response.status(400).send(exception)
    }
  }
}
