import { PaginatedFeature } from "src/app/features/features.interfaces"
import { Chat as ApiChat } from "src/generated-gql-types"

export class ExtendedChat implements Partial<ApiChat> {
  id!: string
  peersIds!: string[]
  createdAt!: Date
  updatedAt!: Date

  chatName!: string
  lastMessage?: string
  chatImage?: string
}

export class PaginatedExtendedChats implements PaginatedFeature<ExtendedChat> {
  data!: ExtendedChat[]

  totalResultsCount!: number
}
