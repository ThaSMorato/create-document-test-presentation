import { Router as ExpressRouter, Router } from 'express'

import { createDocumentController } from '../controllers/create-document-controller'

export const docRoutes: ExpressRouter = Router()

docRoutes.post(
  '/documents',
  createDocumentController.handle.bind(createDocumentController),
)
