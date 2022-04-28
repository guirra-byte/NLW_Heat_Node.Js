import axios from 'axios';
import { sign } from 'jsonwebtoken'
import { IUserRepository } from '../Repository/IUserRepository'
import "dotenv/config"
import { response } from 'express';
import { prisma } from '../../Client/Prisma/Client.prisma';

interface IAccessTokenResponse {

  access_token: string

}

interface IUserResponse {

  login: string,
  id: number,
  name: string,
  email: string,
  created_at: Date,
  updated_at: Date
}

export class AuthenticateUserUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(code: string) {


    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {

      params: {

        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {

        "Accept": "application/json"
      }
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {

      headers: {

        authorization: `Bearer ${accessTokenResponse.access_token}`,
      }
    })

    const { login, id, name, email, created_at, updated_at } = response.data;

    console.log(login, id, name, email, created_at, updated_at)

    let user = await this.userRepository.findOne(id)

    console.log(user)

    if (!user) {


      console.log("User foi criado");


      const github_id = id
      user = await this.userRepository.create(github_id, login, name, email, created_at, updated_at)

    }

    const token = sign({

      user: {

        name: user.name,
        login: user.login,
        email: user.email,
        github_id: user.github_id

      },
    }, "6fe0ec25a152d07f4b472934ac875d75",
      {

        subject: user.id,
        expiresIn: "1d"
      }

    )

    return { token, user };

  }
};