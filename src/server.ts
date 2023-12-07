import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0', // importante para conectar nossa aplicação front-end com a back-end
  })
  .then(() => {
    console.log('🚀 servidor rodando')
  })
