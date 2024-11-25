import { Machine } from '@/core/machine/machine'
import {
  Document,
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'
import { prismaDocumentRepository } from '@/infra/database/prisma/prisma-document-repository'

import { initialStep } from '../machine-steps/initial-step'
import { DocumentsRepository } from '../repositories/documents-repository'

export type CreateDocumentUseCaseRequest = {
  clientAddress: string
  clientEmail: string
  clientMaritalStatus: MaritalStatus
  clientName: string
  clientPhone: string
  content: string
  document: string
  documentType: DocumentType
  status: DocumentStatus
  title: string
}

export class CreateDocumentUseCase {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly machine: Machine,
  ) {}

  async execute(doc: CreateDocumentUseCaseRequest): Promise<Document> {
    const isValid = await this.machine.handle(doc)

    if (isValid.isLeft) {
      throw new Error(isValid.message)
    }

    const documentInstance = Document.create(doc)

    return this.documentsRepository.create(documentInstance)
  }
}

export const createDocumentUseCase = new CreateDocumentUseCase(
  prismaDocumentRepository,
  new Machine(initialStep),
)
