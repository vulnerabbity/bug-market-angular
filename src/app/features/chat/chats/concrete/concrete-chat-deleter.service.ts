import { Injectable } from "@angular/core"
import { firstValueFrom, map } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import { Chat, DeleteChatGQL } from "src/generated-gql-types"

@Injectable({ providedIn: "root" })
export class ConcreteChatDeleterService {
  constructor(private deleteChatGql: DeleteChatGQL, private gqlParser: GraphqlParserService) {}

  async deleteChatResponse(chatId: string) {
    const response$ = this.deleteChatResponse$(chatId)
    return await firstValueFrom(response$)
  }

  deleteChatResponse$(chatId: string) {
    const response$ = this.deleteChatGql.mutate({ chatId })

    const parsedResponse$ = response$.pipe(map(res => this.gqlParser.parse<Chat>(res)))
    return parsedResponse$
  }
}
