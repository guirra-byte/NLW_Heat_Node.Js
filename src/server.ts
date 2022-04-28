import { app } from './app'
import { serverHttp } from './Routes/github.routes'
import { githubRoutes } from './Routes/github.routes'

app.use('/github', githubRoutes)

serverHttp.listen(4000, () => {

  console.log("O server já está rodando --- 🎃😎🤩")
})