import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    users: async (root, args, info) => {
      try {
        return prisma.user.findMany()
      } catch (error) {
        throw error
      }
    },
  },
  Mutation: {
    signupUser: async (root, args, info) => {
      try {
        const user = await prisma.user.findMany({
          where: { email: args.data.email },
        })
        if (user.length != 0) {
          return 'User already exist'
        }
        const encrypt = await bcrypt.hash(args.data.password, 12)
        try {
          const { name, email } = args.data
          const newUser = await prisma.user.create({
            data: {
              email,
              name,
              password: encrypt,
            },
          })
          return { token: jwt.sign(newUser, 'supersecret') }
        } catch (error) {
          throw error
        }
      } catch (err) {
        throw err
      }
    },
    signinUser: async (root, args, info) => {
      const {
        data: { email, password },
      } = args
      const [theUser] = await prisma.user.findMany({
        where: {
          email,
        },
      })
      if (!theUser) throw new Error('Unable to login not user!')
      const isMatch = bcrypt.compareSync(password, theUser.password)
      if (!isMatch) throw new Error('Unable to login not match!')
      return { token: jwt.sign(theUser, 'superscret') }
    },
  },
}
export default resolvers
