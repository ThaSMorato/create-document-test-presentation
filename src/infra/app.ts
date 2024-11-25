import express, { Express } from 'express'

import { docRoutes } from './database/http/routes/document-routes'

export class App {
  private app: Express

  constructor() {
    this.app = express()
  }

  useConfigs() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())

    return this
  }

  createRoutes() {
    this.app.use(docRoutes)
    return this
  }

  listen(port: number) {
    this.app.listen(port, () => console.log(`App listening on port: ${port}`))
    return this
  }

  get httpServerInstance() {
    return this.app
  }
}
