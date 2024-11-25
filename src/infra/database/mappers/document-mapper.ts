import { DocumentForm } from '@prisma/client'

import { Document } from '@/document/domain/entities/document'

export class DocumentMapper {
  static toPrisma({
    id,
    createdAt,
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
    updatedAt,
  }: Document): DocumentForm {
    return {
      createdAt,
      id: String(id),
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
      updatedAt: updatedAt ?? null,
    }
  }
}
