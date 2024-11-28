import { faker } from '@faker-js/faker'
import request from 'supertest'

import {
  DocumentStatus,
  DocumentType,
  MaritalStatus,
} from '@/document/domain/entities/document'
import { App } from '@/infra/app'
import { prismaService } from '@/infra/database/prisma-service'

let app: App

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

describe('Create Document Route e2e test', () => {
  beforeAll(() => {
    app = new App()

    app.useConfigs().createRoutes()
  })

  describe('[POST] /documents', () => {
    it('should return 400 if document number is invalid', async () => {
      const response = await request(app.httpServerInstance)
        .post('/documents')
        .send({
          ...document,
          document: 'w1w2e3e4r',
        })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Invalid fields: document' })
    })

    it('should return 400 if client phone number is invalid', async () => {
      const response = await request(app.httpServerInstance)
        .post('/documents')
        .send({
          ...document,
          clientPhone: 'w1w2e3e4r',
        })

      const createdDocument = await prismaService.documentForm.findFirst()

      expect(createdDocument).toBeNull()
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Invalid fields: clientPhone' })
    })

    it('should return 400 if client phone number and document are invalid', async () => {
      const response = await request(app.httpServerInstance)
        .post('/documents')
        .send({
          ...document,
          clientPhone: 'w1w2e3e4r',
          document: 'w1w2e3e4r',
        })

      const createdDocument = await prismaService.documentForm.findFirst()

      expect(createdDocument).toBeNull()
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        message: 'Invalid fields: document, clientPhone',
      })
    })

    it('should return 201 if document is created', async () => {
      const response = await request(app.httpServerInstance)
        .post('/documents')
        .send(document)

      const createdDocument = await prismaService.documentForm.findFirst()

      expect(createdDocument).toMatchObject(document)
      expect(response.status).toBe(201)
    })
  })
})
