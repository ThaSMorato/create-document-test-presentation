import { faker } from '@faker-js/faker'

import { InitialStep } from '@/document/application/machine-steps/initial-step'
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

  it('should return a right value if document is valid', async () => {
    const result = await sut.handle(document)

    expect(result.isRight()).toBeTruthy()
  })

  it('should return a left value if document is invalid', async () => {
    const result = await sut.handle({ ...document, document: 'invalid' })

    expect(result.isLeft()).toBeTruthy()
  })

  it('should return a left value if clientPhone is invalid', async () => {
    const result = await sut.handle({ ...document, clientPhone: 'invalid' })

    expect(result.isLeft()).toBeTruthy()
  })
})
