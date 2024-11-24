import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum DocumentType {
  ID = 'ID',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  EIN = 'EIN',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export interface DocumentProps {
  title: string
  content: string
  document: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  status: DocumentStatus
  documentType: DocumentType
  clientMaritalStatus: MaritalStatus
  createdAt: Date
  updatedAt?: Date
}

export class Document extends Entity<DocumentProps> {
  static create(
    props: Optional<DocumentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const document = new Document(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return document
  }

  get title(): string {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
  }

  get content(): string {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
  }

  get document(): string {
    return this.props.document
  }

  set document(value: string) {
    this.props.document = value
  }

  get clientName(): string {
    return this.props.clientName
  }

  set clientName(value: string) {
    this.props.clientName = value
  }

  get clientEmail(): string {
    return this.props.clientEmail
  }

  set clientEmail(value: string) {
    this.props.clientEmail = value
  }

  get clientPhone(): string {
    return this.props.clientPhone
  }

  set clientPhone(value: string) {
    this.props.clientPhone = value
  }

  get clientAddress(): string {
    return this.props.clientAddress
  }

  set clientAddress(value: string) {
    this.props.clientAddress = value
  }

  get status(): DocumentStatus {
    return this.props.status
  }

  set status(value: DocumentStatus) {
    this.props.status = value
  }

  get documentType(): DocumentType {
    return this.props.documentType
  }

  set documentType(value: DocumentType) {
    this.props.documentType = value
  }

  get clientMaritalStatus(): MaritalStatus {
    return this.props.clientMaritalStatus
  }

  set clientMaritalStatus(value: MaritalStatus) {
    this.props.clientMaritalStatus = value
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(value: Date | undefined) {
    this.props.updatedAt = value
  }
}
