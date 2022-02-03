import { signup, signin, allUser } from '../controllers/user'

export default (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to tabilisma system app',
    })
  )

  app.post('/api/signup', signup)
  app.post('/api/signin', signin)
  app.get('/api/alluser', allUser)
}
