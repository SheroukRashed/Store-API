import express from 'express'
import jwt from 'jsonwebtoken'

const jwtAuth = (req: express.Request, res: express.Response, next: Function): void => {
  console.log(`url ${req.url} was visited for jwt Auth`)
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid jwt token')
  }
}

export default jwtAuth
