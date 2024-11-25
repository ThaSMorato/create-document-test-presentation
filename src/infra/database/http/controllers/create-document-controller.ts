import { Request, Response } from 'express'

import {
  CreateDocumentUseCase,
  createDocumentUseCase,
} from '@/document/application/use-cases/create-document'

export class CreateDocumentController {
  constructor(private readonly createDocumentUseCase: CreateDocumentUseCase) {}

  async handle(request: Request, response: Response) {
    const {
      clientAddress,
      clientEmail,
      clientMaritalStatus,
      clientName,
      clientPhone,
      content,
      document,
      documentType,
      status,
      title,
    } = request.body

    try {
      await this.createDocumentUseCase.execute({
        clientAddress,
        clientEmail,
        clientMaritalStatus,
        clientName,
        clientPhone,
        content,
        document,
        documentType,
        status,
        title,
      })

      return response.status(201).json({})
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }
}

export const createDocumentController = new CreateDocumentController(
  createDocumentUseCase,
)
