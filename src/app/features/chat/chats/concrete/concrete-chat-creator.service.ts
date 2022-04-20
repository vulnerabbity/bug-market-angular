import { Injectable } from "@angular/core"
import { firstValueFrom, map } from "rxjs"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import { Chat, InitChatIfNotExistsGQL } from "src/generated-gql-types"

@Injectable({ providedIn: "root" })
export class ConcreteChatCreatorService {
  constructor(
    private initChatIfNotExistsQuery: InitChatIfNotExistsGQL,
    private gqlParser: GraphqlParserService
  ) {}

  async initIfNotExistsResponse(otherPeerId: string) {
    const response$ = this.initIfNotExistsResponse$(otherPeerId)
    return await firstValueFrom(response$)
  }

  initIfNotExistsResponse$(otherPeerId: string) {
    const response$ = this.initChatIfNotExistsQuery.mutate({ otherPeerId })

    const parsedResponse$ = response$.pipe(map(res => this.gqlParser.parse<Chat>(res)))
    return parsedResponse$
  }
}
