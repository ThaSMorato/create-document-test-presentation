import { faker } from '@faker-js/faker'
import { mockedDocumentsRepository } from 'tests/repositories/mock/mocked-document-repository'

import { CreateDocumentUseCase } from '@/document/application/use-cases/create-document'
import {
  Document,
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'

let sut: CreateDocumentUseCase

describe('CreateDocumentUseCase', () => {
  describe('unit tests', () => {
    beforeEach(() => {
      sut = new CreateDocumentUseCase(mockedDocumentsRepository)
    })

    it('should call create from repository with de document', async () => {
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

      await sut.execute(document)

      expect(mockedDocumentsRepository.create).toHaveBeenCalledWith(
        expect.any(Document),
      )
    })
  })
})
