import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import _ from 'lodash'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// get all user
async function allUser(req, res) {
  const data = await prisma.user.findMany()
  res.status(200).send({
    success: true,
    data,
  })
}

// registration
async function signup(req, res) {
  console.log(req.body)
  try {
    const user = await prisma.user.findMany({
      where: { email: req.body.email },
    })
    if (user.length != 0) {
      res.status(302).send({
        success: false,
        message: 'User  is found with that email',
      })
      return
    }
    const encrypt = await bcrypt.hash(req.body.password, 12)
    try {
      const { name, email } = req.body
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: encrypt,
        },
      })
      res.status(200).send({
        success: true,
        data: user,
        message: 'Scuccesfully created',
      })
    } catch (err) {
      res.status(500).send({
        error: err,
        data: null,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: 'Failed registration',
      data: null,
      error: err,
    })
  }
}

// login
async function signin(req, res) {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    if (!user) res.status(500).send({ message: 'User is not registered' })
    if (user.length === 0) {
      res.status(400).send({
        message: 'Failed Login',
        token: null,
      })
      return
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
      res.status(500).send({
        message: 'Password dont match',
      })
    } else {
      const token = Jwt.sign(
        {
          user: _.pick(user[0], ['id', 'email']),
        },
        process.env.SECRET,
        { expiresIn: '60s' }
      )
      res.status(200).send({
        message: 'Succesfully login',
        token: token,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: 'Failed login',
      data: null,
      error: err,
    })
  }
}

// Delete User
async function deleteUser(req, res) {
  try {
    const user = await prisma.deleteUser({
      id: req.params.id,
    })
    res.status(200).send({
      message: 'User succesfully deleted',
      data: user.id,
    })
  } catch (e) {
    res.status(500).send({
      message: e,
      data: null,
    })
  }
}

module.exports = {
  signup,
  signin,
  deleteUser,
  allUser,
}
