import { faker } from '@faker-js/faker'
import { InMemoryDocumentsRepository } from 'tests/repositories/in-memory/in-memory-documents-repository'
import { mockedDocumentsRepository } from 'tests/repositories/mock/mocked-documents-repository'
import type { MockInstance } from 'vitest'

import { Machine } from '@/core/machine/machine'
import { InitialStep } from '@/document/application/machine-steps/initial-step'
import { CreateDocumentUseCase } from '@/document/application/use-cases/create-document'
import {
  Document,
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'

let sut: CreateDocumentUseCase
let inMemoryDocsRepository: InMemoryDocumentsRepository
let initialStep: InitialStep
let machine: Machine
let createSpy: MockInstance<(document: Document) => Promise<Document>>

const document = {
  clientAddress: faker.location.streetAddress(),
  clientEmail: faker.internet.email(),
  clientMaritalStatus: MaritalStatus.SINGLE,
  clientName: faker.person.fullName(),
  clientPhone: faker.phone
    .number({ style: 'international' })
    .replaceAll(/\D/g, ''),
  content: faker.lorem.paragraphs(2),
  document: faker.commerce.isbn().replaceAll(/\D/g, ''),
  documentType: DocumentType.EIN,
  status: DocumentStatus.APPROVED,
  title: faker.lorem.words(3),
}

const mockedHandle = vi.fn()

const mockedMachine = {
  handle: mockedHandle,
} as unknown as Machine

describe('CreateDocumentUseCase', () => {
  describe('unit tests', () => {
    beforeEach(() => {
      sut = new CreateDocumentUseCase(mockedDocumentsRepository, mockedMachine)
    })

    it('should throw an error if machine returns invalid', async () => {
      mockedHandle.mockResolvedValue({
        isLeft: true,
        isRight: false,
        message: 'Invalid fields: document',
      })

      await expect(sut.execute(document)).rejects.toThrow(
        'Invalid fields: document',
      )
    })

    it('should call create from repository with de document if machine returns valid', async () => {
      mockedHandle.mockResolvedValue({ isLeft: false, isRight: true })

      await sut.execute(document)

      expect(mockedDocumentsRepository.create).toHaveBeenCalledWith(
        expect.any(Document),
      )
    })
  })

  describe('integration tests', () => {
    beforeEach(() => {
      inMemoryDocsRepository = new InMemoryDocumentsRepository()
      initialStep = new InitialStep()
      machine = new Machine(initialStep)
      sut = new CreateDocumentUseCase(inMemoryDocsRepository, machine)

      createSpy = vi.spyOn(inMemoryDocsRepository, 'create')
    })

    it('should throw an error if document is invalid', async () => {
      await expect(
        sut.execute({ ...document, document: 'invalid' }),
      ).rejects.toThrow('Invalid fields: document')
      expect(inMemoryDocsRepository.items).toHaveLength(0)
    })

    it("should throw an error if client's phone is invalid", async () => {
      await expect(
        sut.execute({ ...document, clientPhone: 'invalid' }),
      ).rejects.toThrow('Invalid fields: clientPhone')
    })

    it('should throw an error if client phone is invalid and document is invalid', async () => {
      await expect(
        sut.execute({
          ...document,
          clientPhone: 'invalid',
          document: 'invalid',
        }),
      ).rejects.toThrow('Invalid fields: document, clientPhone')
    })

    it('should create a document if properties are right', async () => {
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
