import { DocumentsRepository } from '@/document/application/repositories/documents-repository'

export const documentsRepositoryFns = {
  create: vi.fn(),
}

export const mockedDocumentsRepository: DocumentsRepository =
  documentsRepositoryFns
