import { io } from '../../../Routes/github.routes'
import { IMessageRepository } from "../Repository/IMessageRepository";

//Criar Repository de Messages
//Importar com Injeção de Dependência na class de CreateMessageUseCase

export class CreateMessageUseCase {

  constructor(private messageRepository: IMessageRepository) { }
  async execute(text: string, user_id: string) {

    const message = await this.messageRepository.create(text, user_id)

    const infoWS = {

      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        login: message.user.login
      }
    }

    io.emit("text_message", infoWS);

    return message;
  }
}