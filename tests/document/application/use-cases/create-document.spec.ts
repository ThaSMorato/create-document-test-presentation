import { faker } from '@faker-js/faker'
import { InMemoryDocumentsRepository } from 'tests/repositories/in-memory/in-memory-documents-repository'
import { mockedDocumentsRepository } from 'tests/repositories/mock/mocked-documents-repository'
import type { MockInstance } from 'vitest'

import { CreateDocumentUseCase } from '@/document/application/use-cases/create-document'
import {
  Document,
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'

let sut: CreateDocumentUseCase
let inMemoryDocsRepository: InMemoryDocumentsRepository
let createSpy: MockInstance<(document: Document) => Promise<Document>>

const document = {
  clientAddress: faker.location.streetAddress(),
  clientEmail: faker.internet.email(),
  clientMaritalStatus: MaritalStatus.SINGLE,
  clientName: faker.person.fullName(),
  clientPhone: faker.phone.number({ style: 'international' }),
  content: faker.lorem.paragraphs(2),
  document: faker.commerce.isbn(),
  documentType: DocumentType.EIN,
  status: DocumentStatus.APPROVED,
  title: faker.lorem.words(3),
}

describe('CreateDocumentUseCase', () => {
  describe('unit tests', () => {
    beforeEach(() => {
      sut = new CreateDocumentUseCase(mockedDocumentsRepository)
    })

    it('should call create from repository with de document', async () => {
      await sut.execute(document)

      expect(mockedDocumentsRepository.create).toHaveBeenCalledWith(
        expect.any(Document),
      )
    })
  })

  describe('integration tests', () => {
    beforeEach(() => {
      inMemoryDocsRepository = new InMemoryDocumentsRepository()
      sut = new CreateDocumentUseCase(inMemoryDocsRepository)

      createSpy = vi.spyOn(inMemoryDocsRepository, 'create')
    })

    it('should create a document', async () => {
      await sut.execute(document)

      expect(createSpy).toHaveBeenCalledWith(expect.any(Document))
      expect(inMemoryDocsRepository.items).toHaveLength(1)
      expect(inMemoryDocsRepository.items[0]).toStrictEqual(
        expect.objectContaining({
          ...document,
        }),
      )
    })
  })
})
