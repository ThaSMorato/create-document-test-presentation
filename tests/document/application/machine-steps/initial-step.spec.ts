import { faker } from '@faker-js/faker'

import { InitialStep } from '@/document/application/machine-steps/initial-step'
import { MachineStep } from '@/document/application/machine-steps/steps'
import {
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'

let sut: InitialStep

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

describe('InitialStep', () => {
  beforeEach(() => {
    sut = new InitialStep()
  })

  describe('is right', () => {
    it('should return a right value if document and phone is right', async () => {
      const result = await sut.handle(document)

      expect(result.isRight()).toBeTruthy()
    })

    it('should point to DRAFT if status is DRAFT', async () => {
      const result = await sut.handle({
        ...document,
        status: DocumentStatus.DRAFT,
      })

      expect(result.value.step).toBe(MachineStep.DRAFT)
    })

    it('should point to PENDING if status is not DRAFT', async () => {
      const result = await sut.handle({
        ...document,
        status: DocumentStatus.APPROVED,
      })

      expect(result.value.step).toBe(MachineStep.PENDING)
    })
  })

  describe('is left', () => {
    it('should return a left value if document is invalid', async () => {
      const result = await sut.handle({ ...document, document: 'invalid' })

      expect(result.isLeft()).toBeTruthy()
    })

    it('should return a left value if clientPhone is invalid', async () => {
      const result = await sut.handle({ ...document, clientPhone: 'invalid' })

      expect(result.isLeft()).toBeTruthy()
    })
  })
})
