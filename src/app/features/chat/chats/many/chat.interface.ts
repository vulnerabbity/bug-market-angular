import { Chat as ApiChat } from "src/generated-gql-types"
import { PaginatedFeature } from "../../features.interfaces"

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
