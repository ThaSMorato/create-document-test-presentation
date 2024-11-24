import { DocumentsRepository } from '@/document/application/repositories/documents-repository'
import { Document } from '@/document/domain/entities/document'

export class InMemoryDocumentsRepository implements DocumentsRepository {
  items: Document[] = []

  async create(document: Document): Promise<Document> {
    this.items.push(document)

    return document
  }
}
