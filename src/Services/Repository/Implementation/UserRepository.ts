import { prisma } from "../../../Client/Prisma/Client.prisma";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {

  constructor() { }

  private static INSTANCE: UserRepository
  public static getInstance(): UserRepository {

    if (!UserRepository.INSTANCE) {

      UserRepository.INSTANCE = new UserRepository()
    }

    return UserRepository.INSTANCE
  }

  async create(github_id: number, login: string, name: string, email: string, created_at: Date, updated_at: Date) {

    const createUser = await prisma.user.create({

      data: {

        github_id,
        login, name,
        email,
        created_at,
        updated_at
      }
    })

  }

  async findOne(id: number) {

    const userId = id
    const findOneUser = await prisma.user.findFirst({

      where: { github_id: userId }
    })

    return findOneUser
  }

  async findAll() {

    const findAllUser = await prisma.user.findMany()
    return findAllUser
  }

  // async remove(id: number) {

  //   const userId = id
  //   const findAndRemoveUser = await prisma.user.delete({

  //     where: {  }
  //   })

  //   return findAndRemoveUser
  // }
}