import { InitialStep } from '@/document/application/machine-steps/initial-step'
import { MachineStep } from '@/document/application/machine-steps/steps'
import { CreateDocumentUseCaseRequest } from '@/document/application/use-cases/create-document'

export class Machine {
  private machineState: {
    message?: string
    step: MachineStep
    isLeft?: boolean
    isRight?: boolean
  } = {
    step: MachineStep.INITIAL,
  }

  constructor(private readonly initialStep: InitialStep) {}

  private get usecaseLib() {
    return {
      [InitialStep.token]: this.initialStep,
    }
  }

  async handle(document: CreateDocumentUseCaseRequest) {
    this.machineState = {
      step: MachineStep.INITIAL,
    }

    while (this.hasNext) {
      const currentState = this.currentState
      const useCase = this.usecaseLib[currentState]
      const response = await useCase.handle(document)
      this.machineState = response.value
      this.machineState.isLeft = response.isLeft()
      this.machineState.isRight = response.isRight()
    }

    return this.machineState
  }

  get currentState() {
    return this.machineState.step
  }

  private get hasNext() {
    const currentState = this.currentState
    const useCase = this.usecaseLib[currentState]
    return !!useCase
  }
}
