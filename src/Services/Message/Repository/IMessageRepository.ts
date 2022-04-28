

export interface IMessageRepository {

  create(message: string, user_id: string): any
  findOne(message_id: string): any
  remove(message_id: string): any
}