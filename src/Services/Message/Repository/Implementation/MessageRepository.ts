import { IMessageRepository } from "../IMessageRepository";
import { prisma } from "../../../../Client/Prisma/Client.prisma";

export class MessageRepository implements IMessageRepository {

  constructor() { }
  private static INSTANCE: MessageRepository
  public static getInstance(): MessageRepository {

    if (!MessageRepository.INSTANCE) {

      MessageRepository.INSTANCE = new MessageRepository()
    }

    return MessageRepository.INSTANCE
  }

  async create(message: string, user_id: string) {

    const text = message
    const createMessage = await prisma.messages.create({

      data: {

        text,
        user_id_fk: user_id,
      },
      include: {

        user: true
      }
    })

    return createMessage
  }

  async findOne(message_id: string) {

    const findOne = await prisma.messages.findUnique({

      where: { id: message_id },
      include: {

        user: true
      }
    })

    return findOne
  }

  async remove(message_id: string) {

    const findAndRemove = await prisma.messages.delete({

      where: { id: message_id }
    })

    return findAndRemove
  }
}