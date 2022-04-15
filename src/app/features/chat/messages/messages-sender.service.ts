import { Injectable } from "@angular/core"
import { firstValueFrom, map } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import { ChatMessage, SendChatMessageInput, SendMessageGQL } from "src/generated-gql-types"

@Injectable({ providedIn: "root" })
export class MessagesSenderService {
  constructor(
    private gqlParser: GraphqlParserService,
    private sendMessageMutation: SendMessageGQL
  ) {}

  async sendMessageResponse(input: SendChatMessageInput) {
    const response$ = this.sendMessageResponse$(input)

    return await firstValueFrom(response$)
  }

  sendMessageResponse$(input: SendChatMessageInput) {
    const response$ = this.sendMessageMutation.mutate({ input })
    const parsedResponse$ = response$.pipe(
      map(response => this.gqlParser.parse<ChatMessage>(response))
    )

    return parsedResponse$
  }
}
