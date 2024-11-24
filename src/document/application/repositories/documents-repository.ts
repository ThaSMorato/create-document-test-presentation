import { Document } from '@/document/domain/entities/document'

export interface DocumentsRepository {
  create(document: Document): Promise<Document>
}
