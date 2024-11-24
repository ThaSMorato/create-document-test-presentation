import {
  Document,
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'

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
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  async execute({
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
  }: CreateDocumentUseCaseRequest): Promise<Document> {
    const documentInstance = Document.create({
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

    return this.documentsRepository.create(documentInstance)
  }
}
