import UserController from '@/controllers/user-controler'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import express from 'express'
import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'

const app = createExpressServer({
  controllers: [UserController],
  cors: true,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

export default app
