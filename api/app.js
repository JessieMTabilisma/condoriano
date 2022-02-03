import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { prisma } from '@prisma/client'
import typeDefs from './server/schema.js'
import resolvers from './server/resolvers.js'

// require('dotenv').config()
const corsOption = { origin: 'http://localhost:4000' }

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)
  app.use(cors(corsOption))
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      prisma
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({
    app,
    path: '/api',
  })

  await new Promise((resolve) =>
    httpServer.listen({ port: 5000 || process.env.PORT }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}
startApolloServer(typeDefs, resolvers)
