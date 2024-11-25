import { Document } from '@/document/domain/entities/document'

import { DocumentsRepository } from '../../../document/application/repositories/documents-repository'
import { DocumentMapper } from '../mappers/document-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaDocumentRepository implements DocumentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(document: Document): Promise<Document> {
    const data = DocumentMapper.toPrisma(document)

    await this.prisma.documentForm.create({
      data,
    })

    return document
  }
}
