import { response, Router } from 'express';
import "dotenv/config";
import { AuthenticateUserController } from '../Services/Auth/AuthenticateUseController';
import { ensureAuth } from '../Services/Message/Middleware/EnsureAuth';
import { CreateMessageController } from '../Services/Message/CreateMessageUseCase/CreateMessageController';

import { Server } from 'socket.io';
import http from 'http';
import { app } from '../app';
import cors from 'cors';

app.use(cors());

const githubRoutes = Router();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {

  cors: {

    origin: "*"
  }
});

io.on("connecttion", socket => {

  console.log(`Usuário conectado no Socket ${socket.id}`)
})

githubRoutes.get('/', (request, response) => {

  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

githubRoutes.get('/signIn/callback', (request, response) => {

  const { code } = request.query
  return response.json({ code })
})

githubRoutes.post('/authenticate', new AuthenticateUserController().handle)

githubRoutes.post('/messages', ensureAuth, new CreateMessageController().handle)

//Funcionamento como um Middleware

export { githubRoutes }
export { serverHttp }
export { io }