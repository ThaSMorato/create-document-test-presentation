import { Either, left, right } from '@/core/either'
import { DocumentStatus } from '@/document/domain/entities/document'

import { CreateDocumentUseCaseRequest } from '../use-cases/create-document'
import { MachineStep } from './steps'

type InitialStepResponse = Either<
  { message: string; step: MachineStep },
  { step: MachineStep }
>

export class InitialStep {
  static token: MachineStep = MachineStep.INITIAL

  async handle({
    document,
    clientPhone,
    status,
  }: CreateDocumentUseCaseRequest): Promise<InitialStepResponse> {
    const errors: string[] = []
    const notNumberRegex = /\D/g
    if (notNumberRegex.test(document)) {
      errors.push('document')
    }

    if (notNumberRegex.test(clientPhone)) {
      errors.push('clientPhone')
    }

    if (errors.length) {
      return left({
        message: `Invalid fields: ${errors.join(', ')}`,
        step: MachineStep.ERROR,
      })
    }

    return right({
      step:
        status === DocumentStatus.DRAFT
          ? MachineStep.DRAFT
          : MachineStep.PENDING,
    })
  }
}

export const initialStep = new InitialStep()
